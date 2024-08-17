import Request from "../../../../vendors/Request/Request.js";
import Joi from "joi";

class RegisterRequest extends Request {
    /**
     * Returns the validation rules for the RegisterRequest.
     *
     * @return {Object} An object containing the validation rules for email and password.
     */
    static rules() {
        return {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required(),
            password: Joi.string().min(6).required(),
            profile: Joi.string().uri().optional(),
        }
    }

    static {
        this.setSchema();
    }
}

export default RegisterRequest;
