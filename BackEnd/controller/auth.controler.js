import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';

export const signup = async (req, res) => {
    const { FullName, Email, Password } = req.body;

    try{
        if(!FullName || !Email || !Password){
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        if(Password.length < 6){
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        //email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(Email)){
            return res.status(400).json({ message: 'Please provide a valid email address' });
        }

        const User = await User.findOne({ email: Email });
        if(User){
            return res.status(400).json({ message: 'Email already exists' });
        }

        // converting the password to hash

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        const newUser = new User({
            FullName,
            Email,
            Password: hashedPassword
        });
        if(newUser){
            const token = generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                id: newUser._id,
                FullName: newUser.FullName,
                Email: newUser.Email,
                token,
                message: 'User created successfully' });
        }else{
            return res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ message: ' Internal Server error' });
        
    };
}