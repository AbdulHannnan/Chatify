import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import { sendWelcomeEmail } from '../Email/EmailHandler.js';
import { ENV } from '../lib/env.js';

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: 'Please provide all required fields'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Please provide a valid email address'
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'Email already exists'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    
    // 1. Assign the generated token to a variable so you can use it in the response below
    const token = generateToken(savedUser._id, res);

    // 2. Send the welcome email BEFORE sending the final response
    try {
      await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
    } catch (emailError) {
      // We catch this separately so that if the email fails, the user signup doesn't crash
      console.error('Error sending welcome email:', emailError.message);
    }

    // 3. Send the final success response
    return res.status(201).json({
      id: savedUser._id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      token,
      message: 'User created successfully'
    });

  } catch (error) {
    console.error('Signup error:', error.message);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try{
    if(!email || !password){
      return res.status(400).json({
        message: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email});

    if(!user){
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user._id, res);

    return res.status(200).json({
      _id : user._id,
      fullName : user.fullName,
      email : user.email,
      token,
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", "" , {maxAge:0})
  res.status(200).json({message: 'Logout successful'})
}