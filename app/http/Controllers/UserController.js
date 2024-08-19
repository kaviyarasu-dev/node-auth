import User from '../../Models/User.js';
import JsonResponse from '../../base/response.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import LoginRequest from '../Requests/Auth/LoginRequest.js';
import RegisterRequest from '../Requests/Auth/RegisterRequest.js';
import { auth } from '../../Helpers/auth.js';

class UserController {
    /**
     * Handles user registration by validating the request body against a Joi schema,
     * checking for existing users, and creating a new user if valid.
     *
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     *
     * @return {Object} The newly created user object or a JSON response with an error message.
     */
    async register(req, res) {
        const { error, value } = await RegisterRequest.validate(req.body);
        if (error) {
            return new JsonResponse(res).error({ error: error.details[0] }, error.details[0].message, 422);
        }

        if (await User.findOne({ email: value.email })) {
            return new JsonResponse(res).error({ error: 'User already exists' }, 'User already exists', 409);
        }

        const profileImage = req.file ? req.file.path : null;
        let userDetail = await User.create({ ...value, profile: profileImage });

        return new JsonResponse(res).success(userDetail, 'User created successfully', 201);
    }

    /**
     * Handles user login by validating the request body against a Joi schema,
     * checking for existing users, and authenticating the user if valid.
     *
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     *
     * @return {Object} A JSON response with the authentication token and user data, or an error message.
     */
    async login(req, res) {
        const { error, value } = await LoginRequest.validate(req.body);
        if (error) {
            return new JsonResponse(res).error({ error: error.details[0].message }, 'Validation error', 422);
        }

        const { email, password } = value;
        const user = await User.findOne({ email });
        if (!user) {
            return new JsonResponse(res).error({ message: 'Email not found' }, 'Invalid credentials', 401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new JsonResponse(res).error({ message: 'Password is incorrect' }, 'Invalid credentials', 401);
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const { password: userPassword, ...userWithoutPassword } = user._doc;

        return new JsonResponse(res).success({ token, user: userWithoutPassword }, 'User logged in successfully', 200);
    }

    /**
     * Retrieves the user profile data from the authentication middleware and sends a success response.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *
     * @return {Promise<Object>} A promise that resolves to the success response object.
     */
    async profile(req, res) {
        const userData = await auth(req);

        return new JsonResponse(res).success(userData, 'User profile loaded', 200);
    }
}

export default new UserController();
