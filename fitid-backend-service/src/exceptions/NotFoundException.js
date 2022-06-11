const ClientErrorException = require('./ClientException');

class NotFoundException extends ClientErrorException {
    constructor(message) {
        super(message, 404);
        this.name = 'Not Found Error';
    }
}

module.exports = NotFoundException;
