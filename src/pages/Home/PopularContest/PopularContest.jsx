// import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const fetchContests = async () => {
  const res = await fetch("http://localhost:3000/popular-contests");
  if (!res.ok) throw new Error("Failed to fetch Contests");
  return res.json();
};


const PopularContest = () => {

  const navigate = useNavigate();
  const {user} = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["Contests"],
    queryFn: fetchContests,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading)
    return <p className="text-center py-10">Loading...</p>;

  if (error)
    return <p className="text-center py-10">Error loading contests</p>;

  const contestsArray = Array.isArray(data) ? data : [];

  const sortedContests = [...contestsArray]
    .sort((a, b) => (b.participants || 0) - (a.participants || 0))
    .slice(0, 6);

  return (
    <section className="bg-base-100 py-10">
      <div className="container mx-auto px-5">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-4xl font-extrabold">
            Popular{" "}
            <span className="bg-linear-to-r from-[#54CF68] to-[#00827A] bg-clip-text text-transparent">
              Contests
            </span>
          </h2>

          <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
            Explore trending contests and join creative challenges from different categories.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {sortedContests.map((contest) => (
            <div
              key={contest._id}
              className="group bg-base-200 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={contest.image}
                  alt={contest.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>

                {/* participants badge */}
                <div className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                  {contest.participants}+ joined
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">

                <h3 className="text-xl font-bold mb-2">
                  {contest.name}
                </h3>

                <p className="text-base-content/70 text-sm mb-4">
                  {contest.short_description
                    ? contest.short_description.length > 70
                      ? contest.short_description.slice(0, 70) + "..."
                      : contest.short_description
                    : "No description"}
                </p>

                <p className="text-sm text-base-content/60 mb-4">
                  Participants:{" "}
                  <span className="font-semibold text-primary">
                    {contest.participants || 0}
                  </span>
                </p>

                {/* BUTTON */}
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

        {/* SHOW ALL */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/all-contests")}
            className="btn btn-primary px-10 rounded-full"
          >
            Show All
          </button>
        </div>

      </div>
    </section>
  );
};

export default PopularContest;