import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch all users
    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            });
    }, []);

    // role update
    const handleRoleChange = async (email, role) => {
        try {
            const res = await fetch(`http://localhost:3000/users/role/${email}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ role }),
            });

            if (!res.ok) throw new Error();

            Swal.fire({
                title: "Updated 🎉",
                text: `Role changed to ${role}`,
                icon: "success",
                confirmButtonColor: "#54CF68",
            });

            // update UI instantly
            setUsers(prev =>
                prev.map(u =>
                    u.email === email ? { ...u, role } : u
                )
            );

        } catch (error) {
            console.log(error)
            Swal.fire("Error", "Role update failed", "error");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 p-6">

            {/* HEADER */}
            <div className="bg-base-100 p-6 rounded-3xl shadow-xl mb-6">
                <h1 className="text-3xl font-bold">
                    👥 Manage Users
                </h1>
                <p className="text-base-content/60">
                    View all users and change roles (User / Creator / Admin)
                </p>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto bg-base-100 rounded-3xl shadow-xl p-4">
                <table className="table">

                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Change Role</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id || index}>

                                {/* index */}
                                <td>{index + 1}</td>

                                {/* user */}
                                <td className="flex items-center gap-3">
                                    <img
                                        src={
                                            user.photoURL ||
                                            "https://i.ibb.co/2kR1j2P/user.png"
                                        }
                                        className="w-10 h-10 rounded-full"
                                        alt=""
                                    />
                                    <span className="font-semibold">
                                        {user.name || "No Name"}
                                    </span>
                                </td>

                                {/* email */}
                                <td>{user.email}</td>

                                {/* role badge */}
                                <td>
                                    <span
                                        className={`badge ${
                                            user.role === "admin"
                                                ? "badge-error"
                                                : user.role === "creator"
                                                ? "badge-primary"
                                                : "badge-ghost"
                                        }`}
                                    >
                                        {user.role || "user"}
                                    </span>
                                </td>

                                {/* actions */}
                                <td className="flex gap-2">

                                    <button
                                        onClick={() =>
                                            handleRoleChange(user.email, "user")
                                        }
                                        className="btn btn-sm btn-outline"
                                    >
                                        User
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleRoleChange(user.email, "creator")
                                        }
                                        className="btn btn-sm btn-primary"
                                    >
                                        Creator
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleRoleChange(user.email, "admin")
                                        }
                                        className="btn btn-sm btn-error text-white"
                                    >
                                        Admin
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageUsers;