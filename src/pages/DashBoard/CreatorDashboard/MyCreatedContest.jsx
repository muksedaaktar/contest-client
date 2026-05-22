import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyCreatedContests = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);


    // Load creator contests
    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/contests?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setContests(data);
                setLoading(false);
            });
    }, [user?.email]);


    // Delete contest

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This contest will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
        });

        if (!confirm.isConfirmed) return;

        const res = await fetch(`http://localhost:3000/contests/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setContests(prev => prev.filter(c => c._id !== id));

            Swal.fire({
                title: "Deleted!",
                icon: "success",
                confirmButtonColor: "#54CF68",
            });
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="relative max-w-6xl mx-auto p-6">

            <button
                onClick={() => navigate("/creator-dashboard")}
                className="absolute top-4 right-4 btn btn-circle btn-sm bg-base-200 hover:bg-red-500 hover:text-white border-0"
            >
                ✖
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center">
                🧑‍💻 My Created Contests
            </h2>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Prize</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {contests.map(contest => (
                            <tr key={contest._id}>

                                <td>{contest.name}</td>

                                <td>{contest.type}</td>

                                {/* STATUS */}
                                <td>
                                    <span className={`badge ${contest.status === "confirmed"
                                            ? "badge-success"
                                            : contest.status === "rejected"
                                                ? "badge-error"
                                                : "badge-warning"
                                        }`}>
                                        {contest.status || "pending"}
                                    </span>
                                </td>

                                <td>${contest.prizeMoney}</td>

                                <td className="flex gap-2">

                                    {/* EDIT (only pending) */}
                                    {contest.status !== "confirmed" &&
                                        contest.status !== "rejected" && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        navigate(`/edit-contest/${contest._id}`)
                                                    }
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(contest._id)}
                                                    className="btn btn-sm btn-error"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}

                                    {/* SEE SUBMISSIONS */}
                                    <button
                                        onClick={() =>
                                            navigate(`/submissions/${contest._id}`)
                                        }
                                        className="btn btn-sm btn-outline"
                                    >
                                        Submissions
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

export default MyCreatedContests;