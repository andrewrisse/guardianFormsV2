import { lazy, Suspense } from 'react';
import {Navigate, useLocation, useRoutes} from "react-router-dom";
import Dashboard from '../pages/dashboard';
import Home from '../pages/home';
import Login from '../pages/authentication/Login';
import Register from '../pages/authentication/Register';
import Callback from '../components/Callback';
import SurveysList from '../pages/dashboard/surveys';
import SurveyCard from '../components/survey/SurveyCard';
import NewSurveyForm from '../components/survey/NewSurveyForm';
import SurveyDetails from '../pages/dashboard/surveys/survey';
import AuthGuard from '../guards/AuthGuard';


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
      path: "callback",
      element: (<Callback />),
    },
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <Login />
          )
        },
        {
          path: 'register',
          element: (<Register />)
        }
      ]

    },
    {
      path: 'dashboard',
      element: (<AuthGuard> <Dashboard /> </AuthGuard>),
      children :[
        {path: "surveys",
          children: [
            {path: "/", element: <SurveysList />},
            {path: ":sid", element: <SurveyDetails />},
            {path: "new", element: <NewSurveyForm />},
          ]
        },
      ]
    }
  ])
}

