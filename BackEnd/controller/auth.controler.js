import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import dotenv from 'dotenv';
import { sendWelcomeEmail } from '../Email/EmailHandler.js';

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
      await sendWelcomeEmail(savedUser.email, savedUser.fullName, process.en.CLIENT_URL);
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