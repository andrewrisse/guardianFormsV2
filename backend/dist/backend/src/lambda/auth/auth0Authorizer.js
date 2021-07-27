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
exports.handler = void 0;
require("source-map-support/register");
const jsonwebtoken_1 = require("jsonwebtoken");
const logger_1 = require("../../utils/logger");
const axios_1 = __importDefault(require("axios"));
const logger = logger_1.createLogger('auth');
const jwksUrl = 'https://dev-vcyhieqy.us.auth0.com/.well-known/jwks.json';
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info('Authorizing a user', event.authorizationToken);
    try {
        if (!event.authorizationToken)
            throw new Error("Missing authorization token");
        const jwtToken = yield verifyToken(event.authorizationToken);
        logger.info('User was authorized', jwtToken);
        return {
            principalId: jwtToken.sub,
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: '*'
                    }
                ]
            }
        };
    }
    catch (e) {
        logger.error('User not authorized', { error: e.message });
        return {
            principalId: 'user',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Deny',
                        Resource: '*'
                    }
                ]
            }
        };
    }
});
exports.handler = handler;
function verifyToken(authHeader) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = getToken(authHeader);
        const jwt = jsonwebtoken_1.decode(token, { complete: true });
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
    const token = split[1];
    return token;
}
function certToPEM(cert) {
    let pem = cert.match(/.{1,64}/g).join('\n');
    pem = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
    return pem;
}
const getSigningKey = (kid) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(jwksUrl);
    const keys = res.data.keys;
    const signingKeys = keys.filter((key) => key.use === 'sig' && key.kty === 'RSA' && key.kid && (key.x5c && key.x5c.length)).map((key) => {
        return { kid: key.kid, nbf: key.nbf, publicKey: certToPEM(key.x5c != null ? key.x5c : [0]) };
    });
    const signingKey = signingKeys.find((key) => key.kid === kid);
    if (!signingKey) {
        throw new Error('The JWKS endpoint did not contain any signature verification keys');
        logger.error('The JWKS endpoint did not contain any signature verification keys');
    }
    return signingKey;
});
//# sourceMappingURL=auth0Authorizer.js.map