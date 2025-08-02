import Root from '@/layout/Root';
import Home from '@/pages/home/Home';
import SignIn from '@/pages/signIn/SignIn';
import SignUp from '@/pages/signUp/SignUp';
import { createBrowserRouter } from 'react-router';
import PrivateRoute from './PrivateRoutes';
import NotFoundPage from '@/pages/NotFound/NotFound';
import MyBookings from '@/pages/MyBookings/MyBookings';
import RoomsPage from '@/pages/RoomPage/Room';
import RoomDetailsPage from '@/pages/RoomDetails/RoomDetails';
import About from '@/pages/About/About';
import Contact from '@/pages/Contact/Contact';
import DashboardHome from '@/pages/dashboard/Dashboard';
import DashboardLayout from '@/layout/DashboardLayout';

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
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      // private routes
      {
        path: '/rooms/:id',
        element: (
          <PrivateRoute>
            <RoomDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-bookings',
        element: (
          <PrivateRoute>
            <MyBookings />
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
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome />
      }
    ]
  }
]);
