import { ReactNode, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Login from '../pages/authentication/Login';
import { useAuth0 } from '@auth0/auth0-react';
import Callback from '../components/Callback';


type AuthGuardProps = {
  children: ReactNode
}

export default function AuthGuard({children}: AuthGuardProps) {
  const {isAuthenticated, isLoading} = useAuth0();
  const {pathname} = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if(isLoading) return <Callback />

  if(!isAuthenticated) {
    if (pathname !== requestedLocation){
      setRequestedLocation(pathname);
    }
    return <Login />
  }

  if(requestedLocation && pathname !== requestedLocation){
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />
  }
  return <>{children}</>

};
