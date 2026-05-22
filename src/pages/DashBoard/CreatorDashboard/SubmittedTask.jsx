import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const SubmittedTask = () => {
    const { user } = useAuth();
    console.log(user);

    const [submissions, setSubmissions] = useState([]);
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    // Load all submissions
    
    useEffect(() => {
        fetch("http://localhost:3000/submissions")
            .then(res => res.json())
            .then(data => setSubmissions(data));
    }, []);

    const handleWinner = async (submission) => {
        try {
            const winnerData = {
                contestId: submission.contestId,
                winner_name: submission.userName,
                winner_email: submission.userEmail,
                winner_image: submission.userPhoto || "",
                prize: "Declared by creator",
            };

            const res = await fetch("http://localhost:3000/winners", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(winnerData),
            });

            if (!res.ok) throw new Error("Failed");

            Swal.fire({
                title: "Winner Declared 🎉",
                icon: "success",
                confirmButtonColor: "#54CF68",
            });

        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">

            <h2 className="text-3xl font-bold mb-6 text-center">
                📥 Submitted Tasks
            </h2>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>Contest ID</th>
                            <th>User Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {submissions.map((sub, i) => (
                            <tr key={i}>

                                <td>{sub.contestId}</td>

                                <td>{sub.userEmail}</td>

                                <td className="flex gap-2">

                                    {/* VIEW */}
                                    <button
                                        className="btn btn-sm btn-outline"
                                        onClick={() => {
                                            setSelected(sub);
                                            setOpen(true);
                                        }}
                                    >
                                        View
                                    </button>

                                    {/* DECLARE WINNER */}
                                    <button
                                        className="btn btn-sm btn-success text-white"
                                        onClick={() => handleWinner(sub)}
                                    >
                                        Declare Winner
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* ---------------- MODAL ---------------- */}
            {open && selected && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

                    <div className="bg-base-100 p-6 rounded-xl w-full max-w-md">

                        <h2 className="text-xl font-bold mb-3">
                            Submission Details
                        </h2>

                        <p><b>Name:</b> {selected.userName}</p>
                        <p><b>Email:</b> {selected.userEmail}</p>

                        <div className="mt-3">
                            <b>Submission:</b>
                            <p className="mt-1 bg-base-200 p-2 rounded">
                                {selected.submission}
                            </p>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                className="btn btn-primary"
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </button>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default SubmittedTask;