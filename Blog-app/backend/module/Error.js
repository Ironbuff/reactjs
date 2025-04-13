class HttpError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.code = errorCode;
    }
}

module.exports = HttpError; // Correct way to export in CommonJS
