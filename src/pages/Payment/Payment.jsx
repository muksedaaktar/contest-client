import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------------- FETCH CONTEST ----------------
  useEffect(() => {
    fetch(`https://contest-server-lyart.vercel.app/contests/${id}`)
      .then(res => res.json())
      .then(data => setContest(data));
  }, [id]);

  // ---------------- PAYMENT HANDLER ----------------
  const handlePayment = async () => {
    if (!user) {
      return Swal.fire("Login Required", "Please login first", "warning");
    }

    setLoading(true);

    try {
      // fake payment delay
      await new Promise(res => setTimeout(res, 1500));

      // 1️⃣ increase participant count
      await fetch(`https://contest-server-lyart.vercel.app/contests/increase/${id}`, {
        method: "PATCH",
      });

      // 2️⃣ SAVE REGISTRATION (IMPORTANT FIX)
      await fetch("https://contest-server-lyart.vercel.app/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contestId: id,
          userEmail: user.email,
          paid: true,
          registeredAt: new Date(),
        }),
      });

      Swal.fire({
        title: "Payment Successful 🎉",
        text: "You are now registered!",
        icon: "success",
        confirmButtonColor: "#22c55e",
      }).then(() => {
        navigate(`/contest/${id}`);
      });

    } catch (err) {
      console.error(err);

      Swal.fire({
        title: "Payment Failed ❌",
        text: "Try again later",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ---------------- LOADING ----------------
  if (!contest) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-5">

      <div className="w-full max-w-3xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden">

        {/* IMAGE */}
        <img
          src={contest.image}
          className="w-full h-64 object-cover"
          alt="contest"
        />

        <div className="p-8 space-y-6">

          {/* TITLE */}
          <h1 className="text-3xl font-bold text-primary">
            {contest.name}
          </h1>

          {/* ENTRY FEE */}
          <div className="flex justify-between items-center bg-base-200 p-4 rounded-xl">
            <span className="font-semibold">Entry Fee</span>
            <span className="text-2xl font-bold text-secondary">
              ${contest.entryFee}
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-base-content/70">
            {contest.short_description}
          </p>

          {/* USER INFO */}
          <div className="text-sm text-base-content/60">
            Logged in as: <b>{user?.email}</b>
          </div>

          {/* PAY BUTTON */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="btn w-full btn-lg text-white bg-linear-to-r from-primary to-secondary hover:opacity-90"
          >
            {loading ? "Processing..." : `Pay $${contest.entryFee} Now`}
          </button>

        </div>
      </div>

    </div>
  );
};

export default Payment;