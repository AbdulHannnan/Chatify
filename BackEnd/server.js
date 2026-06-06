
import express from 'express';

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

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});