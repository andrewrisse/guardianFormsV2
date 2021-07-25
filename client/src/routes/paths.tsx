import { lazy, Suspense } from 'react';
import {Navigate, useLocation, useRoutes} from "react-router-dom";
import Dashboard from '../pages/dashboard';
import Home from '../pages/home';


const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes(('/dashboard'));


  return (
    <Suspense
      fallback={
        <div>Loading... </div>
      }
    >
      <Component {...props} />
    </Suspense>
);
}

export default function Router(){

  // todo change the survey routs to have components instead of navigate tos
  return useRoutes([
    {
      path: "/",
      element: (<Home />)
    },
    {
      path: 'dashboard',
      element: (<Dashboard />),
      children :[
        {path: "surveys",
          children: [
            {path: "/", element: <Navigate to={"/dashboard/surveys"} replace />},
            {path: "/:sid", element: <Navigate to={"/dashboard/surveys/:sid"} replace />},
            {path: "/new", element: <Navigate to={"/dashboard/surveys/new"} replace />},
          ]
        },
      ]
    }
  ])
}
