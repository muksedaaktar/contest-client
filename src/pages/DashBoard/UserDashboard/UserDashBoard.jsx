import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-base-200 p-5 mt-10">

      {/* WELCOME SECTION */}
      <div className="bg-base-100 rounded-3xl shadow-xl p-8 mb-6">

        <h1 className="text-3xl font-bold">
          💐 Welcome, {user?.displayName || "User"}
        </h1>

        <p className="text-base-content/70 mt-2">
          Explore your contests, track your progress and check your winnings.
        </p>

        {/* Quick stats / CTA */}
        <div className="mt-4">
          <p className="text-sm text-primary font-semibold">
            Keep participating to improve your win rate!
          </p>
        </div>
      </div>

      {/* DASHBOARD MENU */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        <NavLink
          to="/my-profile"
          className="bg-base-100 p-6 rounded-2xl shadow hover:shadow-xl transition"
        >
          <h2 className="text-xl font-bold">My Profile</h2>
          <p className="text-sm text-base-content/70 mt-1">
            Update your information & view stats
          </p>
        </NavLink>

        <NavLink
          to="/my-participations"
          className="bg-base-100 p-6 rounded-2xl shadow hover:shadow-xl transition"
        >
          <h2 className="text-xl font-bold">My Participations</h2>
          <p className="text-sm text-base-content/70 mt-1">
            All contests you joined
          </p>
        </NavLink>

        <NavLink
          to="/my-wins"
          className="bg-base-100 p-6 rounded-2xl shadow hover:shadow-xl transition"
        >
          <h2 className="text-xl font-bold">My Winning Contests</h2>
          <p className="text-sm text-base-content/70 mt-1">
            Prizes and achievements
          </p>
        </NavLink>

      </div>

      {/* CHILD ROUTES AREA */}
      <div className="bg-base-100 rounded-3xl shadow-xl p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default UserDashboard;