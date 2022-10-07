import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
// import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
// import { PATH_AFTER_LOGIN } from '../config';
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
        { path: 'reset-password/:token', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
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
        { path: '/', element: <Navigate to="/auth/login" replace /> },
        {
          path: '/login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: '/',
          element: <MainLayout />,
          children: [
            { path: 'jobs', element: <Jobs /> },
            { path: 'account', element: <Account /> },
            { path: 'resources', element: <Resources /> },
            { path: 'job/new/', element: <JobEdit /> },
            { path: 'job/dashboard/:jobId', element: <JobDashboard /> },
            { path: 'job/edit/:jobId', element: <JobEdit /> },
            { path: 'job/submittal/:jobId', element: <JobSubmittal />},
            { path: 'unit/view/:jobId/', element: <UnitView /> },
            { path: 'unit/add/:jobId/', element: <UnitAdd /> },
            { path: 'unit/configure/:jobId', element: <SetUnitInfo /> },
            { path: 'unit/edit/:jobId/:unitId', element: <SetUnitInfo /> },
          ],
        },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
// const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
// const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));

// Jobs
const Jobs = Loadable(lazy(() => import('../pages/Jobs')));
const JobDashboard = Loadable(lazy(() => import('../pages/JobDashboard')));
const JobEdit = Loadable(lazy(() => import('../pages/JobEdit')));
const JobSubmittal = Loadable(lazy(() => import('../pages/JobSubmittal')));
// Unit
const UnitView = Loadable(lazy(() => import('../pages/UnitView')));
const SetUnitInfo = Loadable(lazy(() => import('../pages/SetUnitInfo')));
const UnitAdd = Loadable(lazy(() => import('../pages/UnitAdd')));
// MyAccount
const Account = Loadable(lazy(() => import('../pages/Account')));

// Resource
const Resources = Loadable(lazy(() => import('../pages/Recources')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
