import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import auth from './routes/auth.js';

dotenv.config();
mongoose.connect(process.env.DB);

const app = express();

app.use('/storage', express.static('storage'));
app.use(express.json());

// Routes
app.use('/auth', auth);

const port = process.env.SERVER_PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));
