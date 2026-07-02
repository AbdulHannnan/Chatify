import express from 'express';
import { signup , login , logout, updateProfile } from '../controller/auth.controler.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.post('/signup', signup)
router.post('/login', login);
router.get('/logout', logout);

router.put('/update-profile', protectRoute, updateProfile);

router.get('/protected', protectRoute, (req, res) => {
  res.status(200).json({ message: 'You have accessed a protected route', user: req.user });
});

export default router;