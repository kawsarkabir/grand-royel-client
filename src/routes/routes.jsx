import Root from '@/layout/Root';
import Home from '@/pages/home/Home';
import SignIn from '@/pages/signIn/SignIn';
import SignUp from '@/pages/signUp/SignUp';
import { createBrowserRouter } from 'react-router';
import PrivateRoute from './PrivateRoutes';
import Dashboard from '@/pages/dashboard/Dashboard';
import NotFoundPage from '@/pages/NotFound/NotFound';
import MyBookings from '@/pages/MyBookings/MyBookings';
import RoomsPage from '@/pages/RoomPage/RoomPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/rooms',
        element: <RoomsPage />,
      },
      // private routes
      {
        path: '/my-bookings',
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
    ],
  },
]);
