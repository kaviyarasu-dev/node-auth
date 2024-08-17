class JsonResponse {
    constructor(response) {
        this.response = response;
    }
    /**
     * Returns a successful JSON response with the specified data, message, and status code.
     *
     * @param {any} data - The data to be included in the response.
     * @param {string} message - The message to be included in the response.
     * @param {number} code - The HTTP status code of the response.
     *
     * @return {object} A JSON response object with the specified data, message, and status code.
     */
    success(data = null, message = '', code = 200) {
        return this.response.status(code).json({
            status: true,
            message: message,
            data: data
        })
    }

    /**
     * Returns an error JSON response with the specified data, message, and status code.
     *
     * @param {any} data - The data to be included in the response.
     * @param {string} message - The message to be included in the response.
     * @param {number} code - The HTTP status code of the response. Default is 500.
     *
     * @return {object} A JSON response object with the specified data, message, and status code.
     */
    error(data = null, message = '', code = 500) {
        return response.status(code).json({
            status: false,
            message: message,
            data: data
        })
    }
}

export default JsonResponse;