const moment = require('moment');
const uuid = require('node-uuid');

class CustomError extends Error {
    clientErrorMessage;
    serverErrorMessage;
    statusCode;
    timestamp;
    uuid;

    constructor(clientErrorMessage, serverErrorMessage, statusCode) {
        super(serverErrorMessage);

        this.clientErrorMessage = CustomError.#formatErrorMessage(clientErrorMessage);
        this.serverErrorMessage = CustomError.#formatErrorMessage(serverErrorMessage);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, CustomError); // keeps CustomError out of stack trace

        this.name = 'CustomError';
        this.timestamp = moment().format('MM-DD-YYYY hh:mm:ss');
        this.uuid = uuid.v4();
    }

    static #formatErrorMessage(message) {
        if (typeof message == 'object')
            return JSON.stringify(message);
        else
            return message;
    }

}

module.exports = CustomError;