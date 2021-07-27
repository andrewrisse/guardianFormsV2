"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = require("jsonwebtoken");
const logger_1 = require("../utils/logger");
const logger = logger_1.createLogger('auth');
const jwksUrl = 'https://dev-vcyhieqy.us.auth0.com/.well-known/jwks.json';
// check each request for a valid bearer token
const withAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization)
        return res.status(400).send("Missing Authorization Header");
    const token = getToken(req.headers.authorization);
    try {
        const jwtToken = yield verifyToken(token);
        logger.info('User was authorized', jwtToken);
        req.user = jsonwebtoken_1.decode(token);
        next();
    }
    catch (error) {
        logger.error(error);
        res.status(403).send("Forbidden");
    }
});
function verifyToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const jwt = jsonwebtoken_1.decode(token, { complete: true });
        if (!jwt.header.kid)
            throw new Error("Missing header kid");
        const key = yield getSigningKey(jwt.header.kid);
        return jsonwebtoken_1.verify(token, key.publicKey, { algorithms: ['RS256'] });
    });
}
function getToken(authHeader) {
    if (!authHeader)
        throw new Error('No authentication header');
    if (!authHeader.toLowerCase().startsWith('bearer '))
        throw new Error('Invalid authentication header');
    const split = authHeader.split(' ');
    return split[1];
}
function certToPEM(cert) {
    if (cert) {
        return `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
    }
    logger.error("No cert");
    throw new Error("No cert");
}
const getSigningKey = (kid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.get(jwksUrl);
        const keys = res.data.keys;
        const signingKeys = keys.filter((key) => key.use === 'sig' && key.kty === 'RSA' && key.kid && (key.x5c && key.x5c.length)).map((key) => {
            return { kid: key.kid, nbf: key.nbf, publicKey: certToPEM(key.x5c) };
        });
        const signingKey = signingKeys.find((key) => key.kid === kid);
        if (!signingKey) {
            logger.error('The JWKS endpoint did not contain any signature verification keys');
            throw new Error('The JWKS endpoint did not contain any signature verification keys');
        }
        return signingKey;
    }
    catch (error) {
        logger.error(error);
        throw new Error("Error getting signing key");
    }
});
exports.default = withAuth;
//# sourceMappingURL=withAuth.js.map