import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import bannerImg1 from "../../../assets/banner-1.jpg";
import bannerImg2 from "../../../assets/banner-2.jpg";
import bannerImg3 from "../../../assets/banner.jpg";

const banners = [
  {
    img: bannerImg1,
    title: "Join Creative Contests",
    desc: "Compete, create and win exciting prizes worldwide.",
  },
  {
    img: bannerImg2,
    title: "Showcase Your Skills",
    desc: "Coding, design, writing & photography contests.",
  },
  {
    img: bannerImg3,
    title: "Win Real Rewards",
    desc: "Earn prizes, recognition and growth.",
  },
];

const Banner = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // CLEAN API CALL FUNCTION
  const fetchResults = async (value) => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://contest-server-lyart.vercel.app/contests?type=${value}`
      );

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // DEBOUNCE SEARCH (CLEAN)
  useEffect(() => {
    if (!searchText.trim()) {
      return;
    }

    const timer = setTimeout(() => {
      fetchResults(searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  // INPUT HANDLER (no effect state issues)
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (!value.trim()) {
      setResults([]);
    }
  };

  return (
    <div className="px-4 mt-10 relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        interval={4000}
      >
        {banners.map((item, index) => (
          <div key={index} className="relative rounded-3xl overflow-hidden">
            <img
              src={item.img}
              className="h-[80vh] object-cover w-full"
              alt={item.title}
            />

            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {item.title}
              </h1>

              <p className="text-gray-200 mb-6 max-w-xl text-xl">
                {item.desc}
              </p>

              {/* SEARCH BOX */}
              <div className="w-full max-w-md relative">
                <div className="flex bg-white rounded-full overflow-hidden shadow-lg">
                  <input
                    type="text"
                    value={searchText}
                    onChange={handleChange}
                    placeholder="Search contest type..."
                    className="w-full px-4 py-3 outline-none"
                  />

                  <button className="bg-linear-to-r from-[#54CF68] to-[#00827A] text-white px-6">
                    Search
                  </button>
                </div>

                {/* DROPDOWN RESULTS */}
                {searchText && (
                  <div className="absolute w-full bg-white mt-2 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">

                    {loading && (
                      <p className="p-3 text-gray-500">Searching...</p>
                    )}

                    {!loading && results.length === 0 && (
                      <p className="p-3 text-gray-500">No results found</p>
                    )}

                    {results.map((contest) => (
                      <div
                        key={contest.id}
                        onClick={() =>  navigate(`/contest/${contest._id || contest.id}`)}
                        className="p-3 hover:bg-gray-100 cursor-pointer border-b"
                      >
                        <p className="font-semibold">{contest.name}</p>
                        <p className="text-sm text-gray-500">
                          {contest.type}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;