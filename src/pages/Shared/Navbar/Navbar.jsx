import { useNavigate } from "react-router-dom";
import Logo from "../../../component/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import ThemeToggle from "../../../component/ThemeToggle";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import ActiveNavLink from "../../../component/ActiveNav/ActiveNavLink";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://contest-server-lyart.vercel.app/users/${user.email}`)
        .then(res => res.json())
        .then(data => setRole(data?.role));
    }
  }, [user?.email]);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setOpen(false);
        navigate("/");
      })
      .catch(console.log);
  };

  const handleDashboard = () => {
    if (role === "admin") navigate("/admin-dashboard");
    else if (role === "creator") navigate("/creator-dashboard");
    else navigate("/user-dashboard");

    setOpen(false);
  };

  const navLinks = (
    <>
      <li><ActiveNavLink to="/" onClick={() => setMobileMenu(false)}>Home</ActiveNavLink></li>
      <li><ActiveNavLink to="/all-contests" onClick={() => setMobileMenu(false)}>All Contests</ActiveNavLink></li>
      <li><ActiveNavLink to="/extra" onClick={() => setMobileMenu(false)}>Extra Section</ActiveNavLink></li>
      <li><ActiveNavLink to="/leader-board" onClick={() => setMobileMenu(false)}>Leader Board</ActiveNavLink></li>
      <li><ActiveNavLink to="/analytics" onClick={() => setMobileMenu(false)}>Analytics</ActiveNavLink></li>
      {role === "user" && (
        <li>
          <ActiveNavLink to="/explore" onClick={() => setMobileMenu(false)}>
            Explore
          </ActiveNavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-200 shadow-md sticky top-0 z-50">

      {/* LEFT (LOGO + DROPDOWN) */}
      <div className="navbar-start flex items-center gap-2">

        {/* MOBILE MENU ICON */}
        <div className="lg:hidden relative">

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="btn btn-ghost btn-sm"
          >
            <FaBars className="text-xl" />
          </button>

          {mobileMenu && (
            <ul className="absolute left-0 mt-3 w-56 bg-base-100 shadow-xl rounded-xl p-3 z-50">
              {navLinks}
            </ul>
          )}
        </div>

        {/* LOGO */}
        <Logo />
        <h1 className="text-2xl font-extrabold dancing-script">
          <span className="text-primary">Con</span>
          <span className="bg-linear-to-r from-[#54CF68] to-[#00827A] bg-clip-text text-transparent">
            TestHub
          </span>
        </h1>
      </div>

      {/* CENTER (DESKTOP MENU) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          {navLinks}
        </ul>
      </div>

      {/* RIGHT (UNCHANGED) */}
      <div className="navbar-end flex items-center gap-3">

        <ThemeToggle />

        {user ? (
          <div className="relative">

            <img
              src={user?.photoURL || "https://i.ibb.co/2kR1j2P/user.png"}
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-primary"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="absolute right-0 mt-3 w-52 bg-base-100 shadow-xl rounded-xl z-50 overflow-hidden">

                <div className="px-4 py-3 border-b">
                  <p className="font-semibold">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Role: {role || "user"}
                  </p>
                </div>

                <button
                  onClick={handleDashboard}
                  className="w-full text-left px-4 py-2 hover:bg-base-200"
                >
                  Dashboard
                </button>

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
            <button onClick={() => navigate("/login")} className="btn btn-primary btn-sm">
              Login
            </button>

            <button onClick={() => navigate("/register")} className="btn btn-outline btn-primary btn-sm">
              Register
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;