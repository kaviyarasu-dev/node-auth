import express from 'express';
import UserController from '../Controllers/UserController.js';
import upload from '../middleware/multer.js';

const route = express.Router();

route.post('/register', upload.single('profile'), UserController.register);
route.post('/login', UserController.login);

export default route;
