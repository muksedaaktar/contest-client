import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useMemo, useState } from "react";

const fetchContests = async () => {
  const res = await fetch("https://contest-server-lyart.vercel.app/contests");
  if (!res.ok) throw new Error("Failed to fetch contests");
  return res.json();
};

const ITEMS_PER_PAGE = 10;

const AllContests = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["allContests"],
    queryFn: fetchContests,
  });
 console.log(data);
  // Safe memoized contests (fixes ESLint warning)
  const contests = useMemo(() => {
    return Array.isArray(data) ? data : [];
  }, [data]);

  // Unique contest types (memoized)
  const contestTypes = useMemo(() => {
    return ["All", ...new Set(contests.map((c) => c.type))];
  }, [contests]);

  // Filter + Search (optimized)
  const filteredContests = useMemo(() => {
    let result = contests;

    if (activeTab !== "All") {
      result = result.filter((c) => c.type === activeTab);
    }

    if (search.trim()) {
      const keyword = search.toLowerCase();
      result = result.filter((c) =>
        c.name?.toLowerCase().includes(keyword)
      );
    }

    return result;
  }, [contests, activeTab, search]);

  // Pagination logic
  const totalPages = useMemo(() => {
    return Math.ceil(filteredContests.length / ITEMS_PER_PAGE);
  }, [filteredContests]);

  const paginatedContests = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredContests.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredContests, currentPage]);

  // reset page on filter/search change
  const handleTabChange = (type) => {
    setActiveTab(type);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <p className="text-center py-10">Loading...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load contests
      </p>
    );
  }

  return (
    <section className="bg-base-200 py-16">
      <div className="container mx-auto px-5">

        {/* Title */}
        <h2 className="text-4xl font-bold text-primary text-center mb-6">
          All Contests
        </h2>

        {/* Search */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search contests..."
            className="input input-bordered w-full max-w-md"
          />
        </div>

        {/* Tabs */}
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

        {/* Cards */}
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
                  onClick={() =>
                    user
                      ? navigate(`/contest/${contest._id}`)
                      : navigate("/login")
                  }
                  className="btn btn-primary w-full rounded-full"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {paginatedContests.length === 0 && (
          <p className="text-center text-base-content/60 mt-10">
            No contests found
          </p>
        )}

        {/* Pagination */}
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