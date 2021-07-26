import {decode} from "jsonwebtoken";

export function decodeJsonWebToken(jwtToken: string) {
  const decodedJwt = decode(jwtToken) as JwtToken;
  return decodedJwt;
}
