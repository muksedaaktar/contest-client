import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../../component/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import ThemeToggle from "../../../component/ThemeToggle";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setOpen(false);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="navbar bg-base-200 shadow-md sticky top-0 z-50">

      {/* LEFT */}
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
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/all-contests">All Contests</NavLink></li>
          <li><NavLink to="/extra">Extra Section</NavLink></li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end container mx-auto px-5 flex items-center gap-3">

        <ThemeToggle />

        {/* AUTH */}
        {user ? (
          <div className="relative">

            {/* Avatar */}
            <img
              src={user?.photoURL || "https://i.ibb.co/2kR1j2P/user.png"}
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-primary"
              onClick={() => setOpen(!open)}
            />

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 w-52 bg-base-100 shadow-xl rounded-xl z-50">

                {/* Name */}
                <div className="px-4 py-3 border-b">
                  <p className="font-semibold">
                    {user?.displayName || "User"}
                  </p>
                </div>

                {/* Dashboard */}
                <button
                  onClick={() => {
                    navigate("/user-dashboard");
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-base-200"
                >
                  Dashboard
                </button>
                {/* Logout */}
                <button
                  onClick={handleLogOut}
                  className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-500"
                >
                  Logout
                </button>

              </div>
            )}
          </div>
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
              className="btn btn-outline btn-primary btn-sm"
            >
              Register
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;