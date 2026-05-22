import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyParticipatedContest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. get registrations
        const res = await fetch(
          `http://localhost:3000/registrations?email=${user.email}`
        );
        const regs = await res.json();

        // 2. join contest data
        const contestDetails = await Promise.all(
          regs.map(async (r) => {
            const cRes = await fetch(
              `http://localhost:3000/contests/${r.contestId}`
            );
            const contest = await cRes.json();

            return {
              ...contest,
              paid: r.paid,
              registeredAt: r.registeredAt,
            };
          })
        );

        setContests(contestDetails);
      } catch (err) {
        console.log(err);
        Swal.fire("Error", "Failed to load contests", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.email]);

  // 🔥 Sort by upcoming deadline
  const sortedContests = [...contests].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-base-200 p-6 mt-10 rounded-2xl">
      <button
        onClick={() => navigate("/user-dashboard")}
        className="absolute top-4 right-4 btn btn-circle btn-sm bg-base-200 hover:bg-red-500 hover:text-white border-0"
      >
        ✖
      </button>

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">
        🎯 My Participated Contests
      </h1>

      {/* EMPTY STATE */}
      {sortedContests.length === 0 ? (
        <div className="text-center text-base-content/60">
          No contests found 😢
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {sortedContests.map((c) => (
            <div
              key={c._id}
              className="card bg-base-100 shadow-xl overflow-hidden"
            >
              <figure>
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-40 w-full object-cover"
                />
              </figure>

              <div className="p-5 space-y-2">

                {/* NAME */}
                <h2 className="text-xl font-bold">{c.name}</h2>

                {/* PRICE */}
                <p>🏆 Prize: {c.prize}</p>

                {/* PAYMENT STATUS */}
                <p>
                  💳 Payment:{" "}
                  <span
                    className={
                      c.paid ? "text-green-500 font-bold" : "text-red-500 font-bold"
                    }
                  >
                    {c.paid ? "Paid" : "Unpaid"}
                  </span>
                </p>

                {/* DEADLINE */}
                <p>
                  ⏳ Deadline:{" "}
                  {new Date(c.deadline).toLocaleDateString()}
                </p>

                {/* REGISTERED DATE */}
                <p className="text-sm text-base-content/60">
                  Registered:{" "}
                  {new Date(c.registeredAt).toLocaleDateString()}
                </p>

                {/* BUTTON */}
                <button
                  onClick={() => navigate(`/contest/${c._id}`)}
                  className="btn btn-primary btn-sm w-full mt-2"
                >
                  View Contest
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MyParticipatedContest;