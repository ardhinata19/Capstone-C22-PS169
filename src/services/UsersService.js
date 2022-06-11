/* eslint-disable no-underscore-dangle */
const {nanoid} = require('nanoid');
const {Pool} = require('pg');
const bcrypt = require('bcrypt');
const NotAuthenticatedException = require('../exceptions/NotAuthenticatedException');
const InvariantException = require('../exceptions/InvariantException');
const NotFoundException = require('../exceptions/NotFoundException');


class UsersService {
    constructor() {
        if (process.env.NODE_ENV === 'production') {
            this._pool = new Pool({
                "host":process.env.PGHOST,
                "database":process.env.PGDATABASE,
                "port":"5432",
                "user":process.env.PGUSER,
                "password":process.env.PGPASSWORD
            });
        } else {
            this._pool = new Pool();
        }
    }

    async addUser(
        {
            firstName,
            lastName,
            email,
            username,
            password,
            imageProfile = 'https://storage.googleapis.com/fitid-image/user.png',
        }) {

        //verifikasi email dan username baru
        await this.verifyEmail(email);
        await this.verifyUsername(username);

        const id = 'user-' + nanoid(16);
        const password_hash = await bcrypt.hash(password, 10);
        const createdAt = new Date().toISOString();
        const query = {
            text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            values: [id, firstName, lastName, email, username, password_hash, imageProfile, createdAt],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantException('failed to add user');
        }

        return result.rows[0].id;
    }

    async getAllUser() {
        const result = await this._pool.query(
            'SELECT id, "firstName", "lastName", "email", "username", "imageProfile" FROM users');
        return result.rows;
    }

    async verifyUsername(username) {
        const query = {
            text: 'SELECT username FROM users WHERE username = $1',
            values: [username],
        };

        const result = await this._pool.query(query);

        if (result.rows.length > 0) {
            throw new InvariantException('failed to add user. username already used.');
        }
    }

    async verifyEmail(email) {
        const query = {
            text: 'SELECT email FROM users WHERE email = $1',
            values: [email],
        };

        const result = await this._pool.query(query);

        if (result.rows.length > 0) {
            throw new InvariantException('failed to add user. email already used.');
        }
    }

    async getUserById(userId) {
        const query = {
            text: 'SELECT id, "firstName", "lastName", "email", "username", "imageProfile" FROM users WHERE id = $1',
            values: [userId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundException('User not found');
        }

        return result.rows[0];
    }

    async getUsersByUsername(username) {
        const query = {
            text: 'SELECT id, "firstName", "lastName", "email", "username", "imageProfile" FROM users WHERE username = $1',
            values: [username],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundException('User not found');
        }
        return result.rows[0];
    }

    async userLoginVerify(username, password) {
        const query = {
            text: 'SELECT id, password FROM users WHERE username = $1',
            values: [username],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotAuthenticatedException('You failed to authenticate');
        }

        const { id, password: hashedPassword } = result.rows[0];

        const match = await bcrypt.compare(password, hashedPassword);

        if (!match) {
            throw new NotAuthenticatedException('You failed to authenticate');
        }

        return id;
    }
}

module.exports = UsersService;
