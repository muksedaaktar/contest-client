import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useMemo, useState, useEffect } from "react";

const fetchContests = async () => {
  const res = await fetch("https://contest-server-lyart.vercel.app/contests");
  if (!res.ok) throw new Error("Failed to fetch contests");
  return res.json();
};

const ITEMS_PER_PAGE = 10;

/* ---------------- SKELETON ---------------- */
const SkeletonCard = () => {
  return (
    <div className="bg-base-100 rounded-2xl shadow-md border border-base-300 overflow-hidden animate-pulse">

      <div className="w-full h-48 bg-base-300"></div>

      <div className="p-5 space-y-3">

        <div className="h-5 w-3/4 bg-base-300 rounded"></div>

        <div className="h-3 w-full bg-base-300 rounded"></div>
        <div className="h-3 w-5/6 bg-base-300 rounded"></div>

        <div className="h-3 w-1/2 bg-base-300 rounded"></div>

        <div className="h-10 w-full bg-base-300 rounded-full"></div>

      </div>

    </div>
  );
};

const AllContests = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);

  const [stage, setStage] = useState("spinner");
  // spinner | skeleton | ready

  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error } = useQuery({
    queryKey: ["allContests"],
    queryFn: fetchContests,
  });

  /* ---------------- LOADING FLOW ---------------- */
  useEffect(() => {
    // setStage("spinner");

    const timer1 = setTimeout(() => {
      setStage("skeleton");

      const timer2 = setTimeout(() => {
        setStage("ready");
      }, 5000);

      return () => clearTimeout(timer2);

    }, 5000);

    return () => clearTimeout(timer1);
  }, []);

  const contests = useMemo(() => {
    return Array.isArray(data) ? data : [];
  }, [data]);

  const contestTypes = useMemo(() => {
    return ["All", ...new Set(contests.map((c) => c.type))];
  }, [contests]);

  /* ---------------- FILTER ONLY BY TAB ---------------- */
  const filteredContests = useMemo(() => {
    let result = contests;

    if (activeTab !== "All") {
      result = result.filter((c) => c.type === activeTab);
    }

    return result;
  }, [contests, activeTab]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredContests.length / ITEMS_PER_PAGE);
  }, [filteredContests]);

  const paginatedContests = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredContests.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredContests, currentPage]);

  const handleTabChange = (type) => {
    setActiveTab(type);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load contests
      </p>
    );
  }

  /* ---------------- LOADING UI ---------------- */
  if (stage === "spinner") {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (stage === "skeleton") {
    return (
      <section className="bg-base-200 py-16">
        <div className="container mx-auto px-5">

          <h2 className="text-4xl font-bold text-primary text-center mb-6">
            All Contests
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="bg-base-200 py-16">
      <div className="container mx-auto px-5">

        {/* TITLE */}
        <h2 className="text-4xl font-bold text-primary text-center mb-6">
          All Contests
        </h2>

        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {contestTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleTabChange(type)}
              className={`px-5 py-2 rounded-full border transition font-semibold ${
                activeTab === type
                  ? "bg-primary text-white border-transparent"
                  : "bg-base-100 text-base-content border-base-300 hover:border-primary hover:text-primary"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedContests.map((contest, index) => (
            <div
              key={contest.id || contest._id || index}
              className="bg-base-100 rounded-2xl shadow-md border border-base-300 overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={contest.image}
                alt={contest.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">
                  {contest.name}
                </h3>

                <p className="text-base-content/70 mb-3">
                  {contest.short_description?.slice(0, 80)}...
                </p>

                <p className="text-base-content/60 mb-2">
                  Type:{" "}
                  <span className="text-primary">{contest.type}</span>
                </p>

                <p className="text-base-content/60 mb-4">
                  Participants: {contest.participants}
                </p>

                <button
                  onClick={() => navigate(`/contest/${contest._id}`)}
                  className="btn btn-primary w-full rounded-full"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {paginatedContests.length === 0 && (
          <p className="text-center text-base-content/60 mt-10">
            No contests found
          </p>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded border ${
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : "bg-base-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default AllContests;