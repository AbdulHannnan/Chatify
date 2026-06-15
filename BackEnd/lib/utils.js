import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in Milliseconds
    httpOnly: true, // prevent from XSS atcak 
    sameSite: 'strict', // prevent from CSRF attack
    secure : process.env.NODE_ENV === 'development' ? false : true // set secure flag in production
});
return token;
}