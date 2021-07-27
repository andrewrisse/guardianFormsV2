"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJsonWebToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function decodeJsonWebToken(jwtToken) {
    return jsonwebtoken_1.decode(jwtToken);
}
exports.decodeJsonWebToken = decodeJsonWebToken;
//# sourceMappingURL=decodeJsonWebToken.js.map