import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyWinningContest = () => {
  const { user } = useAuth();
  const [wins, setWins] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    const fetchWins = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:3000/winners");
        const data = await res.json();

        const myWins = data.filter(
          (win) => win.winner_email === user.email
        );

        const result = await Promise.all(
          myWins.map(async (w) => {
            const cRes = await fetch(
              `http://localhost:3000/contests/${w.contestId}`
            );
            const contest = await cRes.json();

            return {
              ...contest,
              winner: w,
            };
          })
        );

        setWins(result);
      } catch (err) {
        console.log(err);
        Swal.fire("Error", "Failed to load winning contests", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchWins();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-base-200 p-6 mt-10">

        <button
                onClick={() => navigate("/user-dashboard")}
                className="absolute top-4 right-4 btn btn-circle btn-sm bg-base-200 hover:bg-red-500 hover:text-white border-0"
            >
                ✖
            </button>

      {/* HEADER */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">
          🏆 My Winning Contests
        </h1>
        <p className="text-base-content/60 mt-2">
          Your achievements and rewards
        </p>
      </div>

      {/* EMPTY STATE */}
      {wins.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-2xl font-bold">
            No Wins Yet
          </h2>
          <p className="text-base-content/60 mt-2">
            Keep participating to win exciting prizes!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {wins.map((w) => (
            <div
              key={w._id}
              className="card bg-base-100 shadow-xl hover:scale-105 transition duration-300"
            >

              {/* IMAGE */}
              <figure>
                <img
                  src={w.image}
                  alt={w.name}
                  className="h-44 w-full object-cover"
                />
              </figure>

              <div className="p-5 space-y-3">

                {/* CONTEST NAME */}
                <h2 className="text-xl font-bold">
                  🎯 {w.name}
                </h2>

                {/* PRIZE */}
                <div className="flex justify-between items-center">
                  <p className="text-green-600 font-bold">
                    🏆 Prize: {w.winner?.prize}
                  </p>

                  <span className="badge badge-success">
                    Winner
                  </span>
                </div>

                {/* WINNER INFO */}
                <div className="flex items-center gap-3 bg-base-200 p-3 rounded-xl">

                  <img
                    src={w.winner?.winner_image}
                    alt="winner"
                    className="w-12 h-12 rounded-full border-2 border-primary"
                  />

                  <div>
                    <p className="font-semibold">
                      {w.winner?.winner_name}
                    </p>
                    <p className="text-xs text-base-content/60">
                      Official Winner 🎉
                    </p>
                  </div>

                </div>

                {/* CELEBRATION BADGE */}
                <div className="bg-linear-to-r from-primary to-secondary text-white text-center py-2 rounded-xl font-bold">
                  🎉 Achievement Unlocked
                </div>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MyWinningContest;