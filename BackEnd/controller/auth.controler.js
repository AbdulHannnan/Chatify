import User from '../models/user.model.js';

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
    }
    catch(error){
        
    };
}