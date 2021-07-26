import { IdToken, useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';



const useIdToken = () => {
  const {getIdTokenClaims} = useAuth0();
  const [token, setToken] = useState<IdToken>();

  useEffect(() => {
    async function getToken() {
      const tokenRes =  await getIdTokenClaims();
      setToken(tokenRes);
    }
    getToken();

  }, [getIdTokenClaims])


  return token;

}

export default useIdToken;
