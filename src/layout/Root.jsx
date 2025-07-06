import Navbar from '@/components/navbar';
import { Outlet } from 'react-router';

export default function Root() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
