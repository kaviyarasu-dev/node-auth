import User from '../Models/User.js';
import jwt from 'jsonwebtoken';

/**
 * Authenticates a user by verifying the provided JWT token and returns the corresponding user data.
 *
 * @param {Object} req - The HTTP request object containing the authorization header with the JWT token.
 *
 * @return {Object} The authenticated user data, excluding the password.
 */
export async function auth(req) {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(' ')[1] || null;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return await User.findById(decoded.id).select('-password');
}