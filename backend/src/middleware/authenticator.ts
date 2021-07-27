import {Request, Response, NextFunction} from "express";
import Axios from "axios";
import { verify, decode } from 'jsonwebtoken'
import { JwtPayload } from '../../@types/JwtPayload';
import { Jwt } from '../../@types/Jwt';
import { createLogger } from '../utils/logger';
const logger = createLogger('auth')

const jwksUrl = 'https://dev-vcyhieqy.us.auth0.com/.well-known/jwks.json';

// check each request for a valid bearer token
const authenticator = async (req: Request, res: Response, next: NextFunction) => {
      if(!req.headers.authorization) return res.status(400).send("Missing Authorization Header");
        const token = getToken(req.headers.authorization);
      try{
        const jwtToken = await verifyToken(token)
        logger.info('User was authorized', jwtToken)

        req.user = decode(token);
        next();
      }
      catch(error){
        logger.error(error);
        res.status(403).send("Forbidden");
      }

};


async function verifyToken(token: string): Promise<JwtPayload> {

  const jwt: Jwt = decode(token, { complete: true }) as Jwt
  if(!jwt.header.kid) throw new Error("Missing header kid");
  const key = await getSigningKey(jwt.header.kid);

  return verify(token, key.publicKey, { algorithms: ['RS256']}) as JwtPayload;
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  return split[1]

}

function certToPEM( cert: string ) {
  if(cert){
    return  `-----BEGIN CERTIFICATE-----\n${ cert }\n-----END CERTIFICATE-----\n`;
  }
  logger.error("No cert");
  throw new Error("No cert");
}


const getSigningKey = async (kid: string) => {
  try{
    const res = await Axios.get(jwksUrl);
    const keys = res.data.keys;
    const signingKeys = keys.filter((key: any) => key.use === 'sig' && key.kty === 'RSA' && key.kid && (key.x5c && key.x5c.length)).map((key: any) => {
      return { kid: key.kid, nbf: key.nbf, publicKey: certToPEM( key.x5c )}});

    const signingKey = signingKeys.find((key: any) => key.kid === kid);

    if(!signingKey){
      logger.error('The JWKS endpoint did not contain any signature verification keys');
      throw new Error('The JWKS endpoint did not contain any signature verification keys');
    }

    return signingKey;
  }
  catch(error){
    logger.error(error)
    throw new Error("Error getting signing key");
  }


}


export default authenticator;



