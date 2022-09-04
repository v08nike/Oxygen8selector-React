import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        { path: 'reset-password', element: <ResetPassword /> },
      ],
    },
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      children: [
        { path: '/', element: <Navigate to="/auth/login" replace />  },
        { path: '/login', element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        )  },
        {
          path: '/',
          element: <MainLayout />,
          children: [
            { path: 'myJobs', element: <MyJobs /> },
            { path: 'myAccount', element: <MyAccount /> },
            { path: 'jobDashboard', element: <JobDashboard /> },
            { path: 'editJobInfo', element: <EditJobInfo /> },
            { path: 'viewUnitList', element: <ViewUnitList /> },
            { path: 'setUnitInfo', element: <SetUnitInfo /> }
          ]
        }
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
// const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
// const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
// const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// MyJobs
const MyJobs = Loadable(lazy(() => import('../pages/myjobs/MyJobs')));
const JobDashboard = Loadable(lazy(() => import('../pages/myjobs/JobDashboard')));
const EditJobInfo = Loadable(lazy(() => import('../pages/myjobs/EditJobInfo')));
const ViewUnitList = Loadable(lazy(() => import('../pages/myjobs/ViewUnitList')));
const SetUnitInfo = Loadable(lazy(() => import('../pages/myjobs/SetUnitInfo')));

// MyAccount
const MyAccount = Loadable(lazy(() => import('../pages/MyAccount')));

const Page404 = Loadable(lazy(() => import('../pages/Page404')));
