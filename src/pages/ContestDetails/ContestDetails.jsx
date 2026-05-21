import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ContestDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [contest, setContest] = useState(null);
    const [winner, setWinner] = useState(null);
    const [timeLeft, setTimeLeft] = useState("");

    // Fetch contest
    useEffect(() => {
        fetch(`http://localhost:3000/contests/${id}`)
            .then(res => res.json())
            .then(data => setContest(data));
    }, [id]);

    // Fetch winner
    useEffect(() => {
        fetch(`http://localhost:3000/winners/${id}`)
            .then(res => res.json())
            .then(data => setWinner(data))
            .catch(() => setWinner(null));
    }, [id]);

    // Countdown
    useEffect(() => {
        if (!contest?.deadline) return;


        const interval = setInterval(() => {
            const deadline = new Date(contest.deadline).getTime();
            const now = new Date().getTime();

            const diff = deadline - now;

            if (isNaN(deadline)) {
                setTimeLeft("Invalid deadline");
                clearInterval(interval);
                return;
            }

            if (diff <= 0) {
                setTimeLeft("Contest Ended");
                clearInterval(interval);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const mins = Math.floor((diff / (1000 * 60)) % 60);

            setTimeLeft(`${days}d ${hours}h ${mins}m`);

        }, 1000);

        return () => clearInterval(interval);
    }, [contest?.deadline]);

    if (!contest) {
        return (
            <div className="text-center py-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    const isEnded = timeLeft === "Contest Ended";

    return (
        <div className="bg-base-200 min-h-screen py-10 px-5">

            <div className="relative max-w-6xl mx-auto bg-base-100 shadow-2xl rounded-3xl overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 right-4 z-10 btn btn-circle btn-sm bg-base-200 text-red-500 font-extrabold hover:bg-red-500 hover:text-white border-0"
                >
                    ✕
                </button>

                {/* Banner */}
                <img
                    src={contest.image}
                    className="w-full h-100 object-cover"
                />

                <div className="p-8 space-y-6">

                    {/* Title */}
                    <h1 className="text-4xl font-bold text-primary">
                        {contest.name}
                    </h1>

                    {/* Countdown */}
                    <div className="text-lg font-semibold">
                        ⏳ Deadline:{" "}
                        <span className={isEnded ? "text-red-500" : "text-green-500"}>
                            {timeLeft}
                        </span>
                    </div>

                    {/* Participants */}
                    <p className="text-base-content/70">
                        👥 Participants: <span className="font-bold">{contest.participants}</span>
                    </p>

                    {/* Prize */}
                    <p className="text-xl font-semibold text-secondary">
                        🏆 Prize: {contest.prize}
                    </p>

                    {/* Description */}
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Description</h2>
                        <p className="text-base-content/70">
                            {contest.details}
                        </p>
                    </div>

                    {/* Task */}
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Task</h2>
                        <p className="text-base-content/70">
                            {contest.task}
                        </p>
                    </div>

                    {/* Winner */}
                    {winner && (
                        <div className="bg-green-100 p-5 rounded-2xl flex items-center gap-4">
                            <img
                                src={winner.winnerImage}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-bold text-lg">
                                    🏆 Winner: {winner.winnerName}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Prize: {winner.prize}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-5">
                        <button
                            disabled={isEnded}
                            onClick={() =>
                                user
                                    ? navigate(`/payment/${id}`)
                                    : navigate("/login")
                            }
                            className={`btn btn-lg w-full rounded-2xl text-white ${isEnded
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-linear-to-r from-primary to-secondary"
                                }`}
                        >
                            {isEnded ? "Contest Ended" : "Register / Pay Now"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContestDetails;