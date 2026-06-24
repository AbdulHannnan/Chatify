import express from 'express';
import { signup , login , logout, updateProfile } from '../controller/auth.controler.js';

const router = express.Router();


router.post('/signup', signup)
router.post('/login', login);
router.get('/logout', logout);

router.put('/update-profile', protectRoute, updateProfile);

export default router;