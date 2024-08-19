import Request from "../../../base/request.js";
import Joi from "joi";

class LoginRequest extends Request {
    /**
     * Returns the validation rules for the LoginRequest.
     *
     * @return {Object} An object containing the validation rules for email and password.
     */
    static rules() {
        return {
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        }
    }

    static {
        this.setSchema();
    }
}

export default LoginRequest;
