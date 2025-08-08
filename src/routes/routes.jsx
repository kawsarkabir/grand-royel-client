import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import PrivateRoute from './PrivateRoutes';
// import AdminRoute from './AdminRoutes'; // Optional for admin-only routes

// Layouts
import RootLayout from '@/layout/Root';
import DashboardLayout from '@/layout/DashboardLayout';

// Public Components
const Home = lazy(() => import('@/pages/home/Home'));
const SignIn = lazy(() => import('@/pages/signIn/SignIn'));
const SignUp = lazy(() => import('@/pages/signUp/SignUp'));
const About = lazy(() => import('@/pages/About/About'));
const Contact = lazy(() => import('@/pages/Contact/Contact'));
const RoomsPage = lazy(() => import('@/pages/RoomPage/Room'));
import NotFoundPage from '@/pages/NotFound/NotFound';
import MyBookingsPage from '@/pages/MyBookings/MyBookings';

// Private Components
const RoomDetailsPage = lazy(() => import('@/pages/RoomDetails/RoomDetails'));
const MyBookings = lazy(() => import('@/pages/MyBookings/MyBookings'));

// Dashboard Components
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
// const UsersManagement = lazy(() => import('@/pages/dashboard/UsersManagement'));
// const RoomsManagement = lazy(() => import('@/pages/dashboard/RoomsManagement'));

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

      // Protected routes
      {
        path: 'rooms/:id',
        element: (
          <PrivateRoute>
            <RoomDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'bookings',
        element: (
          <PrivateRoute>
            <MyBookings />
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
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Dashboard /> },
      // { path: 'users', element: <UsersManagement /> },
      // { path: 'rooms', element: <RoomsManagement /> },
      { path: 'bookings', element: <MyBookingsPage /> },

      // Admin-only routes example:
      // {
      //   path: 'admin-settings',
      //   element: <AdminRoute><AdminSettings /></AdminRoute>
      // }
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
