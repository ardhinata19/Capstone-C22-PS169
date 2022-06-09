const Jwt = require('@hapi/jwt');
const InvariantException = require('../exceptions/InvariantException');

const GenerateToken = {
    generateAccessToken: (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
    generateRefreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
    verifyRefreshToken: (refreshToken) => {
        try {
            const token = Jwt.token.decode(refreshToken);
            Jwt.token.verifySignature(token, process.env.REFRESH_TOKEN_KEY);
            const {payload} = token.decoded;
            return payload;
        } catch (error) {
            throw new InvariantException('Refresh token invalid');
        }
    },
};

module.exports = GenerateToken;
