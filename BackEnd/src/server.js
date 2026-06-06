
import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

const PORT= process.env.PORT;

const app = express();


app.get('/api/auth/signup', (req, res) => {
    res.send('Signup route');
});

app.get('/api/auth/login', (req, res) => {
    res.send('Login route');
});

app.get('/api/auth/logout', (req, res) => {
    res.send('Logout route');
});

// Ensure you have something like this:
app.get('/', (req, res) => {
  res.send('Hello! The server is working.');
});

app.listen(process.env.PORT || 3001, () => {
    console.log('Server is running on port', process.env.PORT || 3001);
});