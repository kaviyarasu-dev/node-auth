import express from 'express';
import UserController from '../app/http/Controllers/UserController.js';
import upload from '../app/http/middleware/multer.js';
import isValidUser from '../app/http/middleware/isValidUser.js';

const route = express.Router();

route.post('/register', upload.single('profile'), UserController.register);
route.post('/login', UserController.login);
route.get('/profile', isValidUser, UserController.profile);

export default route;
