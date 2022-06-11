const ClientErrorException = require('./ClientException');

class NotAuthenticatedException extends ClientErrorException {
    constructor(message) {
        super(message, 401);
        this.name = 'You failed to authenticate';
    }
}

module.exports = NotAuthenticatedException;
