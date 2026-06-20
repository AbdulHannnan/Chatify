import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

export const generateToken = (userId, res) => {

  // After the CodeRabit Review

  const { JWT_SECRET } = ENV;
  if(!JWT_SECRET) {
    throw new Error('JWT_SECRET is missing in .env file');
  }

  const token = jwt.sign(
    { id: String(userId) },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: ENV.NODE_ENV === 'production',
  });

  return token;
};