import { useEffect, useState } from "react";

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(res => res.json())
            .then(data => {
                // sort by wins (descending)
                const sorted = data.sort(
                    (a, b) => (b.wins || 0) - (a.wins || 0)
                );
                setUsers(sorted);
                setLoading(false);
            });
    }, []);

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
            <div className="bg-base-100 rounded-3xl shadow-xl p-6 mb-6 text-center">
                <h1 className="text-4xl font-extrabold">
                    🏆 Leaderboard
                </h1>
                <p className="text-base-content/60 mt-2">
                    Top users ranked by contest wins
                </p>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto bg-base-100 rounded-3xl shadow-xl p-4">
                <table className="table">

                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Wins</th>
                            <th>Participated</th>
                            <th>Win Rate</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => {

                            const wins = user.wins || 0;
                            const participated = user.participated || 0;
                            const winRate =
                                participated === 0
                                    ? 0
                                    : ((wins / participated) * 100).toFixed(1);

                            return (
                                <tr key={user._id || index}>

                                    {/* rank */}
                                    <td>
                                        <div className="font-bold text-lg">
                                            #{index + 1}
                                        </div>
                                    </td>

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
                                            {user.name}
                                        </span>
                                    </td>

                                    {/* email */}
                                    <td>{user.email}</td>

                                    {/* wins */}
                                    <td>
                                        <span className="badge badge-success text-white">
                                            {wins}
                                        </span>
                                    </td>

                                    {/* participated */}
                                    <td>{participated}</td>

                                    {/* win rate */}
                                    <td>
                                        <span className="badge badge-primary">
                                            {winRate}%
                                        </span>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Leaderboard;