import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import PrivateRoute from './PrivateRoutes';
import RootLayout from '@/layout/Root';
import DashboardLayout from '@/layout/DashboardLayout';
import AdminRoute from '@/components/AdminRoutes';

// Public Components
const Home = lazy(() => import('@/pages/home/Home'));
const SignIn = lazy(() => import('@/pages/signIn/SignIn'));
const SignUp = lazy(() => import('@/pages/signUp/SignUp'));
const About = lazy(() => import('@/pages/About/About'));
const Contact = lazy(() => import('@/pages/Contact/Contact'));
const RoomsPage = lazy(() => import('@/pages/RoomPage/Room'));
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFound'));

// Private Components
const RoomDetailsPage = lazy(() => import('@/pages/RoomDetails/RoomDetails'));
const MyBookingsPage = lazy(() => import('@/pages/MyBookings/MyBookings'));
const ProfilePage = lazy(() => import('@/pages/dashboard/Profile'));

// Dashboard Components
const DashboardHomePage = lazy(
  () => import('@/pages/dashboard/DashboardHomePage'),
);
const UsersManagement = lazy(
  () => import('@/pages/dashboard/admin/UserManagement'),
);
const RoomsManagement = lazy(
  () => import('@/pages/dashboard/admin/RoomManagement'),
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'rooms', element: <RoomsPage /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'signin', element: <SignIn /> },
      {
        path: 'rooms/:id',
        element: (
          <PrivateRoute>
            <RoomDetailsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHomePage /> },
      { path: 'bookings', element: <MyBookingsPage /> },
      { path: 'profile', element: <ProfilePage /> },
      {
        path: 'users',
        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        ),
      },
      {
        path: 'rooms',
        element: (
          <AdminRoute>
            <RoomsManagement />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
