
import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import authRoutes from '../routes/auth.routes.js';
import messageRoutes from '../routes/message.routes.js';

const PORT= process.env.PORT;

const app = express();


app.use("/api/auth", authRoutes);
app.use('/api/message', messageRoutes);

// Ensure you have something like this:
app.get('/', (req, res) => {
  res.send('Hello! The server is working.');
});

app.listen(PORT || 3001, () => {
    console.log('Server is running on port', PORT || 3001);
});