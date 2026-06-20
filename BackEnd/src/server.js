import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../lib/db.js';

import authRoutes from '../routes/auth.routes.js';
import messageRoutes from '../routes/message.routes.js';
import { ENV } from '../lib/env.js';

const PORT= ENV.PORT;

const app = express();

const __dirname = path.resolve();

app.use(express.json()); //req body parser for json data


app.use("/api/auth", authRoutes);
app.use('/api/message', messageRoutes);


// Make ready for the Deployment
if(ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../FrontEnd/dist')))
    app.get('*', ( _ , res) => {
        res.sendFile(path.join(__dirname, '../FrontEnd/dist/index.html'))
    });
  };

// Ensure you have something like this:
app.get('/', (req, res) => {
  res.send('Hello! The server is working.');
});

app.listen(PORT || 3001, () => {
    console.log('Server is running on port', PORT || 3001);
    connectDB();
});