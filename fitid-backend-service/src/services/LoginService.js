/* eslint-disable no-underscore-dangle */
const {Pool} = require('pg');
const InvariantException = require('../exceptions/InvariantException');

class LoginService {
    constructor() {
        if (process.env.NODE_ENV === 'production') {
            this._pool = new Pool({
                "host": process.env.PGHOST,
                "database": process.env.PGDATABASE,
                "port": "5432",
                "user": process.env.PGUSER,
                "password": process.env.PGPASSWORD
            });
        } else {
            this._pool = new Pool();
        }
    }

    async addRefreshToken(token) {
        const query = {
            text: 'INSERT INTO login VALUES($1)',
            values: [token],
        };

        await this._pool.query(query);
    }

    async verifyRefreshToken(token) {
        const query = {
            text: 'SELECT token FROM login WHERE token =$1',
            values: [token],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantException('Invalid refresh token');
        }
    }

    async deleteRefreshToken(token) {
        await this.verifyRefreshToken(token);

        const query = {
            text: 'DELETE FROM login WHERE token = $1',
            values: [token],
        };

        await this._pool.query(query);
    }
}

module.exports = LoginService;
