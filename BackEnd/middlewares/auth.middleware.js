import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ENV } from '../lib/env.js';

export const protectRoute = async (req, res, next) => {
  try{
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({message : "Unathoueized access"});

        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if(!decoded){ return res.status(401).json({message : "Invalid Token"});}

        const user = await User.findById(decoded.id).select('-password');
        if(!user){ return res.status(401).json({message : "User not found"});}
        req.user = user;
        next();
    }
  }

  catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }

};