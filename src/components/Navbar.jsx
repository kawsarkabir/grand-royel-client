import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { asset } from '@/assets/assets';
import { Button } from './ui/button';
import navLinks from '@/utils/navLinks';

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <div className="container mx-auto px-4">
      <div
        className={`fixed inset-0 bg-black/30 z-70 transition-transform duration-300 ${
          openMenu ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
        onClick={toggleMenu}
      >
        <div
          className="w-[60vw] h-full bg-white  p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <Link to="/" className="flex items-center gap-3 mb-8">
            <img src={asset.Logo} alt="logo" className="w-10" />
            <h1 className=" text-xl font-bold">Logo</h1>
          </Link>

          <ul className="flex flex-col gap-6">
            {navLinks.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `text-lg font-semibold   ${
                      isActive ? 'text-sky-500 ' : ' '
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/login">
                <Button className="mt-6 w-full  font-semibold px-4 py-2 rounded-full shadow hover:shadow-none">
                  Sign Up
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <nav className=" sticky top-0 z-50">
        <div className="max-w-[1300px] mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={asset.Logo} alt="logo" className="w-8" />
            <h1 className="text-black text-xl font-bold">Logo</h1>
          </Link>

          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `text-lg font-semibold ${
                      isActive ? 'text-blue-500' : 'text-black'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>

          <button className="md:hidden p-2 rounded" onClick={toggleMenu}>
            {openMenu ? <FaXmark size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>
    </div>
  );
}
