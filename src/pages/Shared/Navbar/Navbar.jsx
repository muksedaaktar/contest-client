// import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../../component/Logo/Logo';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {

  const navigate = useNavigate();
  const { user,logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
    .then()
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="navbar bg-base-200 shadow-md sticky top-0 z-50">

      {/* LEFT: Logo */}
      <div className="navbar-start container mx-auto px-5">

        <div className="flex items-center gap-2">
          <Logo />

          <h1 className="text-2xl font-extrabold">
            <span className="text-primary">Con</span>
            <span className="bg-linear-to-r from-[#54CF68] to-[#00827A] bg-clip-text text-transparent">
              TestHub
            </span>
          </h1>
        </div>

        {/* Mobile Menu Icon (UI only) */}
        <div className="dropdown lg:hidden ml-3">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            ☰
          </div>

          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/all-contests">All Contests</NavLink></li>
            <li><NavLink to="/extra">Extra Section</NavLink></li>
          </ul>
        </div>

      </div>

      {/* CENTER MENU */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          <li><NavLink className="hover:text-primary" to="/">Home</NavLink></li>
          <li><NavLink className="hover:text-primary" to="/all-contests">All Contests</NavLink></li>
          <li><NavLink className="hover:text-primary" to="/extra">Extra Section</NavLink></li>
        </ul>
      </div>

      {/* RIGHT SIDE (UI only placeholders) */}
      <div className="navbar-end container mx-auto px-5 flex items-center gap-3">

        {/* Auth buttons (static UI) */}
        {
          user ? (
            <button
              onClick={() => handleLogOut()}
              className="btn btn-primary btn-sm"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary btn-sm"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="btn btn-primary btn-sm"
              >
                Register
              </button>
            </div>
          )
        }

      </div>
    </div>
  );
};

export default Navbar;