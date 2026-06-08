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
    }
    catch(error){
        
    };
}