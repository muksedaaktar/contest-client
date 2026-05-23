import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageContests = () => {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch contests
    useEffect(() => {
        fetch("https://contest-server-lyart.vercel.app/contests")
            .then(res => res.json())
            .then(data => {
                setContests(data);
                setLoading(false);
            });
    }, []);

    // CONFIRM contest
    const handleConfirm = async (id) => {
        try {
            const res = await fetch(`https://contest-server-lyart.vercel.app/contests/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "confirmed" }),
            });

            if (!res.ok) throw new Error();

            Swal.fire("Approved 🎉", "Contest confirmed", "success");

            setContests(prev =>
                prev.map(c =>
                    c._id === id ? { ...c, status: "confirmed" } : c
                )
            );
        } catch {
            Swal.fire("Error", "Failed to confirm", "error");
        }
    };

    // REJECT contest
    const handleReject = async (id) => {
        try {
            const res = await fetch(`https://contest-server-lyart.vercel.app/contests/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "rejected" }),
            });

            if (!res.ok) throw new Error();

            Swal.fire("Rejected ❌", "Contest rejected", "success");

            setContests(prev =>
                prev.map(c =>
                    c._id === id ? { ...c, status: "rejected" } : c
                )
            );
        } catch {
            Swal.fire("Error", "Failed to reject", "error");
        }
    };

    // DELETE contest
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This contest will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`https://contest-server-lyart.vercel.app/contests/${id}`, {
                    method: "DELETE",
                });

                if (!res.ok) {
                    Swal.fire("Error", "Delete failed", "error");
                    return;
                }

                setContests(prev => prev.filter(c => c._id !== id));

                Swal.fire("Deleted!", "Contest removed.", "success");
            }
        });
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
            <div className="bg-base-100 rounded-3xl shadow-xl p-6 mb-6">
                <h1 className="text-3xl font-bold">
                    🏆 Manage Contests
                </h1>
                <p className="text-base-content/60">
                    Approve, reject or delete contests created by users
                </p>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto bg-base-100 rounded-3xl shadow-xl p-4">
                <table className="table">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Contest</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {contests.map((c, index) => (
                            <tr key={c._id || index}>

                                {/* index */}
                                <td>{index + 1}</td>

                                {/* contest */}
                                <td className="flex items-center gap-3">
                                    <img
                                        src={c.image}
                                        className="w-12 h-12 rounded-xl object-cover"
                                        alt=""
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            {c.name}
                                        </p>
                                        <p className="text-xs text-base-content/60">
                                            ${c.entryFee || c.price || 0}
                                        </p>
                                    </div>
                                </td>

                                {/* type */}
                                <td>
                                    <span className="badge badge-ghost">
                                        {c.type}
                                    </span>
                                </td>

                                {/* status */}
                                <td>
                                    <span
                                        className={`badge ${
                                            c.status === "confirmed"
                                                ? "badge-success"
                                                : c.status === "rejected"
                                                ? "badge-error"
                                                : "badge-warning"
                                        }`}
                                    >
                                        {c.status || "pending"}
                                    </span>
                                </td>

                                {/* actions */}
                                <td className="flex gap-2">

                                    <button
                                        onClick={() => handleConfirm(c._id)}
                                        className="btn btn-sm btn-success text-white"
                                    >
                                        Confirm
                                    </button>

                                    <button
                                        onClick={() => handleReject(c._id)}
                                        className="btn btn-sm btn-warning"
                                    >
                                        Reject
                                    </button>

                                    <button
                                        onClick={() => handleDelete(c._id)}
                                        className="btn btn-sm btn-error text-white"
                                    >
                                        Delete
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

export default ManageContests;