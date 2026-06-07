
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from '../routes/auth.routes.js';
import messageRoutes from '../routes/message.routes.js';

const PORT= process.env.PORT;

const app = express();

const __dirname = path.resolve();


app.use("/api/auth", authRoutes);
app.use('/api/message', messageRoutes);


// Make ready for the Deployment
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../FrontEnd/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../FrontEnd/dist/index.html'))
    });
  };

// Ensure you have something like this:
app.get('/', (req, res) => {
  res.send('Hello! The server is working.');
});

app.listen(PORT || 3001, () => {
    console.log('Server is running on port', PORT || 3001);
});