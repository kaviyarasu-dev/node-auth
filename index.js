import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import errorHandlerMiddleware from './app/http/middleware/errorHandlerMiddleware.js';
import auth from './routes/auth.js';

dotenv.config();
mongoose.connect(process.env.DB);

const app = express();

app.use(cors());
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', auth);

app.use((req, res, next) => {
    currentReq = req;
    currentRes = res;
    next();
});

let unhandledRejectionError = null;
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    unhandledRejectionError = reason;
});

// In your route handler
app.use((req, res, next) => {
    if (unhandledRejectionError) {
      res.status(unhandledRejectionError.statusCode).json({
        message: unhandledRejectionError.message,
      });
      unhandledRejectionError = null;
    } else {
      next();
    }
  });

const url = process.env.SERVER_URL;
const port = process.env.SERVER_PORT;
app.listen(port, () => console.log(`Server started on ${url}:${port}`));
