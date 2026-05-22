import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-base-200 p-6">

            {/* HERO SECTION */}
            <div className="bg-base-100 rounded-3xl shadow-xl p-8 mb-8">

                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

                    {/* LEFT */}
                    <div>
                        <h1 className="text-4xl font-extrabold leading-tight">
                            <span className="bg-linear-to-r from-[#54CF68] to-[#00827A] bg-clip-text text-transparent">
                                👑 Admin Dashboard
                            </span>
                        </h1>

                        <p className="mt-3 text-base-content/70 max-w-2xl">
                            Manage users, control contests, approve creators,
                            and maintain the entire ContestHub platform.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">

                            <button
                                onClick={() =>
                                    navigate("/manage-users")
                                }
                                className="btn btn-primary"
                            >
                                👥 Manage Users
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/manage-contests")
                                }
                                className="btn btn-outline btn-primary"
                            >
                                🏆 Manage Contests
                            </button>

                        </div>
                    </div>

                    {/* RIGHT */}
                    <div>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="admin"
                            className="w-52"
                        />
                    </div>

                </div>
            </div>

            {/* DASHBOARD CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* USERS CARD */}
                <div className="bg-base-100 rounded-3xl shadow-xl p-6">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
                            👥
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold">
                                Manage Users
                            </h2>

                            <p className="text-base-content/60 text-sm">
                                Change user roles and control permissions.
                            </p>
                        </div>

                    </div>

                    <div className="mt-6">

                        <button
                            onClick={() =>
                                navigate("/manage-users")
                            }
                            className="btn btn-primary w-full"
                        >
                            Open Users Panel
                        </button>

                    </div>
                </div>

                {/* CONTESTS CARD */}
                <div className="bg-base-100 rounded-3xl shadow-xl p-6">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-3xl">
                            🏆
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold">
                                Manage Contests
                            </h2>

                            <p className="text-base-content/60 text-sm">
                                Approve, reject or delete contests.
                            </p>
                        </div>

                    </div>

                    <div className="mt-6">

                        <button
                            onClick={() =>
                                navigate("/manage-contests")
                            }
                            className="btn btn-primary text-white w-full"
                        >
                            Open Contest Panel
                        </button>

                    </div>
                </div>

            </div>

            {/* FOOTER INFO */}
            <div className="mt-10 bg-base-100 rounded-3xl shadow-lg p-6">

                <h3 className="text-xl font-bold mb-3">
                    ⚡ Admin Controls
                </h3>

                <div className="grid md:grid-cols-3 gap-4">

                    <div className="bg-base-200 rounded-2xl p-4">
                        <h4 className="font-bold mb-1">
                            🔐 User Role Management
                        </h4>

                        <p className="text-sm text-base-content/70">
                            Promote users to creators or admins instantly.
                        </p>
                    </div>

                    <div className="bg-base-200 rounded-2xl p-4">
                        <h4 className="font-bold mb-1">
                            ✅ Contest Approval
                        </h4>

                        <p className="text-sm text-base-content/70">
                            Review creator contests before publishing.
                        </p>
                    </div>

                    <div className="bg-base-200 rounded-2xl p-4">
                        <h4 className="font-bold mb-1">
                            🗑 Platform Moderation
                        </h4>

                        <p className="text-sm text-base-content/70">
                            Remove invalid or inappropriate contests.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;