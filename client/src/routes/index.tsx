import { useRoutes} from "react-router-dom";
import Dashboard from '../pages/dashboard';
import Home from '../pages/home';
import Login from '../pages/authentication/Login';
import Register from '../pages/authentication/Register';
import Callback from '../components/Callback';
import SurveysList from '../pages/dashboard/surveys';
import NewSurveyForm from '../components/survey/NewSurveyForm';
import SurveyDetails from '../pages/dashboard/surveys/survey';
import AuthGuard from '../guards/AuthGuard';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';


export default function Router(){
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
      element: (<AuthGuard> <DashboardLayout /> </AuthGuard>),
      children: [
        {path: '/', element: <Dashboard />},
        {path: "/surveys",
          children: [
            {path: '/', element: <SurveysList />},
            {path: ":sid", element: <SurveyDetails />},
            {path: "new", element: <NewSurveyForm />},
          ]
        },
      ]
    }
  ])
}

