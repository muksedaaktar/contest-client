import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [contest, setContest] = useState(null);
  const [winner, setWinner] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const [task, setTask] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // ---------------- FETCH CONTEST ----------------
  useEffect(() => {
    fetch(`http://localhost:3000/contests/${id}`)
      .then(res => res.json())
      .then(data => setContest(data));
  }, [id]);

  // ---------------- FETCH WINNER ----------------
  useEffect(() => {
    fetch(`http://localhost:3000/winners/${id}`)
      .then(res => res.json())
      .then(data => setWinner(data))
      .catch(() => setWinner(null));
  }, [id]);

  // ---------------- CHECK REGISTRATION ----------------
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/registrations?email=${user.email}&contestId=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setIsRegistered(true);
      });
  }, [id, user?.email]);

  // ---------------- COUNTDOWN ----------------
  useEffect(() => {
    if (!contest?.deadline) return;

    const interval = setInterval(() => {
      const deadline = new Date(contest.deadline).getTime();
      const now = new Date().getTime();

      const diff = deadline - now;

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

  // ---------------- SUBMIT TASK ----------------
  const handleSubmitTask = async () => {
    if (!user) {
      return Swal.fire("Login Required", "Please login first", "warning");
    }

    if (!task.trim()) {
      return Swal.fire("Error", "Task cannot be empty", "error");
    }

    try {
      const res = await fetch("http://localhost:3000/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contestId: id,
          userEmail: user.email,
          taskSubmission: task,
          submittedAt: new Date(),
        }),
      });

      if (res.ok) {
        Swal.fire("Success 🎉", "Task submitted successfully!", "success");
        setTask("");
        setOpenModal(false);
        navigate("/all-contests");
      }
    } catch (err) {
         console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (!contest) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const isEnded = contest?.deadline && new Date(contest.deadline) < new Date();

  return (
    <div className="bg-base-200 min-h-screen py-10 px-5">

      <div className="relative max-w-6xl mx-auto bg-base-100 shadow-2xl rounded-3xl overflow-hidden">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 z-10 btn btn-circle btn-sm bg-base-200 text-red-500 hover:bg-red-500 hover:text-white border-0"
        >
          ✕
        </button>

        {/* IMAGE */}
        <img
          src={contest.image}
          className="w-full h-100 object-cover"
        />

        <div className="p-8 space-y-6">

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-primary">
            {contest.name}
          </h1>

          {/* DEADLINE */}
          <p className="text-lg font-semibold">
            ⏳ Deadline:{" "}
            <span className={isEnded ? "text-red-500" : "text-green-500"}>
              {timeLeft}
            </span>
          </p>

          {/* PARTICIPANTS */}
          <p>
            👥 Participants:{" "}
            <span className="font-bold">{contest.participants}</span>
          </p>

          {/* PRIZE */}
          <p className="text-xl font-bold text-secondary">
            🏆 Prize: {contest.prize}
          </p>

          {/* DETAILS */}
          <div>
            <h2 className="text-2xl font-bold">Description</h2>
            <p>{contest.details}</p>
          </div>

          {/* TASK */}
          <div>
            <h2 className="text-2xl font-bold">Task</h2>
            <p>{contest.task}</p>
          </div>

          {/* WINNER */}
          {winner && (
            <div className="bg-green-100 p-5 rounded-2xl flex items-center gap-4">
              <img
                src={winner.winner_image}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-lg">
                  🏆 Winner: {winner.winner_name}
                </h3>
                <p>Prize: {winner.prize}</p>
              </div>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          {isRegistered && !isEnded && (
            <button
              onClick={() => setOpenModal(true)}
              className="btn btn-primary w-full"
            >
              Submit Task
            </button>
          )}

          {/* REGISTER BUTTON */}
          {!isRegistered && (
            <button
              onClick={() =>
                user
                  ? navigate(`/payment/${id}`)
                  : navigate("/login")
              }
              disabled={isEnded}
              className={`btn w-full text-white ${
                isEnded
                  ? "bg-gray-400"
                  : "bg-linear-to-r from-primary to-secondary"
              }`}
            >
              {isEnded ? "Contest Ended" : "Register / Pay"}
            </button>
          )}
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenModal(false);
          }}
        >
          <div className="bg-base-100 p-6 rounded-2xl w-[90%] max-w-md space-y-4">

            <h2 className="text-xl font-bold">Submit Your Task</h2>

            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Paste links or description..."
            />

            <div className="flex gap-2">
              <button
                onClick={() => setOpenModal(false)}
                className="btn btn-sm w-1/2"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmitTask}
                className="btn btn-primary btn-sm w-1/2"
              >
                Submit
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ContestDetails;