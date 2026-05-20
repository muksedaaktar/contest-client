// import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../../component/Logo/Logo';

const Navbar = () => {
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

        {/* Theme button (UI only, no logic) */}
        {/* <button className="btn btn-ghost btn-sm">
          🌞 / 🌙
        </button> */}

        {/* Auth buttons (static UI) */}
        <button className="btn btn-primary btn-sm">
          Login
        </button>

        <button className="btn btn-primary btn-sm">
          Register
        </button>

        {/* Profile placeholder (UI only) */}
        <div className="w-10 h-10 rounded-full bg-base-300 border-2 border-primary cursor-pointer" />

      </div>
    </div>
  );
};

export default Navbar;