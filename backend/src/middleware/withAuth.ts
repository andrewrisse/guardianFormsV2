import { decodeJsonWebToken } from '../utils/decodeJsonWebToken';

// check each request for a valid bearer token
const withAuth = (handler) => {
  return async (req, res) => {

      // Get token and check if it exists
      if (!req.headers.authorization?.toLocaleLowerCase().startsWith('bearer'))
        return res.status(401).send('Unauthenticated');
      //@ts-ignore
      req.user = decodeJsonWebToken(req.headers.authorization.split(' ')[1]);

    return handler(req, res);
  };
};

export default withAuth;
