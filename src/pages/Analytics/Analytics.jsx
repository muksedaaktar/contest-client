import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from "recharts";

const Analytics = () => {
    const [stats, setStats] = useState(null);
    const [contests, setContests] = useState([]);
    const totalUsers = stats?.length || 0;

    useEffect(() => {
        // users stats (win/participation)
        fetch("https://contest-server-lyart.vercel.app/users")
            .then(res => res.json())
            .then(data => {
                setStats(data);
            });

        // contests data
        fetch("https://contest-server-lyart.vercel.app/contests")
            .then(res => res.json())
            .then(data => {
                setContests(data);
            });
    }, []);

    // fallback safe values
    const totalContests = contests.length || 0;

    const pending = contests.filter(c => c.status === "pending").length;
    const confirmed = contests.filter(c => c.status === "confirmed").length;
    const rejected = contests.filter(c => c.status === "rejected").length;

    const pieData = [
        { name: "Pending", value: pending },
        { name: "Confirmed", value: confirmed },
        { name: "Rejected", value: rejected },
    ];

    const COLORS = ["#FBBF24", "#22C55E", "#EF4444"];

    // dummy monthly trend (you can replace with real DB aggregation later)
    const monthlyData = [
        { month: "Jan", contests: 3 },
        { month: "Feb", contests: 5 },
        { month: "Mar", contests: 8 },
        { month: "Apr", contests: 6 },
        { month: "May", contests: totalContests },
    ];

    return (
        <div className="min-h-screen bg-base-200 p-6">

            {/* HEADER */}
            <div className="bg-base-100 rounded-3xl shadow-xl p-6 mb-6 text-center">
                <h1 className="text-4xl font-extrabold">
                    📊 Analytics Dashboard
                </h1>
                <p className="text-base-content/60 mt-2">
                    Platform performance overview
                </p>
            </div>

            {/* TOP STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                <div className="bg-base-100 p-6 rounded-2xl shadow">
                    <h2 className="text-lg font-bold">Total Contests</h2>
                    <p className="text-3xl font-extrabold text-primary">
                        {totalContests}
                    </p>
                </div>

                <div className="bg-base-100 p-6 rounded-2xl shadow">
                    <h2 className="text-lg font-bold">Confirmed</h2>
                    <p className="text-3xl font-extrabold text-success">
                        {confirmed}
                    </p>
                </div>

                <div className="bg-base-100 p-6 rounded-2xl shadow">
                    <h2 className="text-lg font-bold">Pending</h2>
                    <p className="text-3xl font-extrabold text-warning">
                        {pending}
                    </p>
                </div>
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* PIE CHART */}
                <div className="bg-base-100 p-6 rounded-2xl shadow">
                    <h2 className="font-bold mb-4">Contest Status Overview</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* LINE CHART */}
                <div className="bg-base-100 p-6 rounded-2xl shadow">
                    <h2 className="font-bold mb-4">Monthly Contest Growth</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="contests"
                                stroke="#54CF68"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* BAR CHART */}
                <div className="bg-base-100 p-6 rounded-2xl shadow lg:col-span-2">
                    <h2 className="font-bold mb-4">
                        Contest Distribution
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={pieData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#00827A" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
            <div className="bg-base-100 p-6 rounded-2xl shadow">
                <h2 className="text-lg font-bold">Total Users</h2>
                <p className="text-3xl font-extrabold text-primary">
                    {totalUsers}
                </p>
            </div>
        </div>
    );
};

export default Analytics;