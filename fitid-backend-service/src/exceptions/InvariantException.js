const ClientErrorException = require('./ClientException');

class InvariantException extends ClientErrorException {
    constructor(message) {
        super(message);
        this.name = 'Invariant Error';
    }
}

module.exports = InvariantException;
