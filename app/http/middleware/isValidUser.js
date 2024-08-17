import jwt from 'jsonwebtoken';
import JsonResponse from '../../base/response.js';

export default (req, res, next) => {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(' ')[1] || null;
    if (!token) {
        return new JsonResponse(res).error(null, 'Access Token Required', 401);
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, res) => {
        if (err) {
            return new JsonResponse(res).error(null, 'Access Token Invalid', 401);
        }

        next();
    });
}