
import JsonResponse from '../../base/response.js';

export default (err, req, res, next) => {
    if (err) {
        return new JsonResponse(res).error(err.message, err.message, err.statusCode);
    }
};
