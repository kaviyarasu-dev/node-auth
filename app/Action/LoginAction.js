import User from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import LoginRequest from '../http/Requests/Auth/LoginRequest.js';

class LoginAction {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }

    /**
     * Handles user login by validating the request body against a Joi schema,
     * checking for existing users, and authenticating the user if valid.
     *
     * @return {Object} A JSON response with the authentication token and user data, or an error message.
     *
     * @throws {Object} An error object with a message and status code if the request body is invalid or user is not found.
     */
    async handle() {
        const { error, value } = await LoginRequest.validate(this.request.body);
        if (error) {
            throw { message: error.details[0].message, statusCode: 422 };
        }

        const { email, password } = value;
        const user = await User.findOne({ email });
        if (!user) {
            throw { message: 'Email not found', statusCode: 404 };
        }

        this.validPassword(user, password);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const { password: userPassword, ...userWithoutPassword } = user._doc;

        return { token, user: userWithoutPassword };
    }

    /**
     * Validates the given password against the user's stored password.
     *
     * @param {Object} user - The user object containing the password to be compared.
     * @param {string} password - The password to be validated.
     *
     * @throws {Object} An error object with a message and status code if the password is invalid.
     */
    async validPassword(user, password) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw { message: 'Password is incorrect', statusCode: 422 };
        }
    }
}

export default LoginAction;