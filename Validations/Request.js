import Joi from 'joi';

class Request {
	static schema = null;

	/**
	 * Sets the schema for the Request class using Joi.
	 *
	 * @return {void}
	 */
	static setSchema() {
		this.schema = Joi.object(this.rules());
	}

	/**
	 * Returns the validation rules for the Request class.
	 *
	 * @return {Object} An object containing the validation rules.
	 */
	static rules() {
		throw new Error('rules Method not implemented');
	}

	/**
	 * Validates the request body against the defined schema.
	 *
	 * @param {Object} fields - The request body to be validated.
	 * 
	 * @return {Object} The validated request body.
	 */
	static async validate(fields) {
		if (!this.schema) {
			throw new Error('Schema is not defined');
		}

		return await this.schema.validate(fields);
	}
}

export default Request;