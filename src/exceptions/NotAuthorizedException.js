const ClientErrorException = require('./ClientException');

class NotAuthorizedException extends ClientErrorException {
    constructor(message) {
        super(message, 403);
        this.name = 'You Do Not Have Access Rights to this End-point';
    }
}

module.exports = NotAuthorizedException;
