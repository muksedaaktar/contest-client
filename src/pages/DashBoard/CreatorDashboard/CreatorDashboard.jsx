import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaPlusCircle, FaList, FaTasks, FaEdit } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const CreatorDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-base-200 flex">

            {/* SIDEBAR */}
            <aside className="w-80 bg-base-100 shadow-xl p-5 flex flex-col justify-between">

                <div>

                    {/* Logo / Title */}
                    <h2 className="text-2xl font-bold text-primary mb-6">
                        🎯 Creator Panel
                    </h2>

                    {/* Welcome Box */}
                    <div className="bg-linear-to-r from-[#54CF68] to-[#00827A] text-white p-4 rounded-xl mb-6">
                        <h3 className="text-lg font-semibold">
                            Welcome 💐
                        </h3>
                        <p className="text-sm">
                            {user?.displayName || "Creator"}
                        </p>
                        <p className="text-xs opacity-80">
                            Build & manage your contests
                        </p>
                    </div>

                    {/* NAV LINKS */}
                    <nav className="space-y-2">

                        <NavLink
                            to="/add-contest"
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
                        >
                            <FaPlusCircle /> Add Contest
                        </NavLink>

                        <NavLink
                            to="/my-contests"
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
                        >
                            <FaList /> My Contests
                        </NavLink>

                        <NavLink
                            to="/submit-task"
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
                        >
                            <FaTasks /> Submit Task
                        </NavLink>

                        <NavLink
                            to="/edit-contest"
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
                        >
                            <FaEdit /> Edit Contest
                        </NavLink>

                    </nav>
                </div>

                {/* Footer */}
                <button
                    onClick={() => navigate("/")}
                    className="btn btn-primary w-full"
                >
                    Back to Home
                </button>

            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-6">

                <div className="bg-base-100 p-6 rounded-2xl shadow-md mb-6">
                    <h1 className="text-3xl font-bold">
                         Creator Dashboard
                    </h1>

                    <p className="text-base-content/70 mt-2">
                        Manage your contests, submissions, and updates all in one place.
                    </p>
                </div>

                {/* PAGE CONTENT */}
                <div className="bg-base-100 p-6 rounded-2xl shadow-md">
                    <Outlet />
                </div>

            </main>
        </div>
    );
};

export default CreatorDashboard;