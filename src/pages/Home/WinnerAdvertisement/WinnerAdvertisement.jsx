// import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";

const fetchWinners = async () => {
  const res = await fetch("/data/winners.json");
  if (!res.ok) throw new Error("Failed to fetch winners");
  return res.json();
};

const WinnerAdvertisement = () => {
  const { data: winners = [], isLoading } = useQuery({
    queryKey: ["winners"],
    queryFn: fetchWinners,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <section className="py-10 bg-base-100">

      {/* TITLE SECTION */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          🏆 <span className="text-primary">Hall</span> of <span className="text-primary">Fame</span>
        </h2>
        <p className="text-base-content/70 mt-3 max-w-2xl mx-auto">
          Meet our recent champions who turned their skills into real rewards and proved their talent on ContestHub.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14 px-4">

        <div className="bg-base-200 rounded-2xl p-6 text-center">
          <h3 className="text-3xl font-bold text-primary">
            {winners.length * 120}+
          </h3>
          <p className="text-base-content/70">Verified Winners</p>
        </div>

        <div className="bg-base-200 rounded-2xl p-6 text-center">
          <h3 className="text-3xl font-bold text-primary">$50K+</h3>
          <p className="text-base-content/70">Total Rewards Given</p>
        </div>

        <div className="bg-base-200 rounded-2xl p-6 text-center">
          <h3 className="text-3xl font-bold text-primary">24+</h3>
          <p className="text-base-content/70">Active Contests</p>
        </div>

      </div>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto px-4">

        {/* LEFT SIDE */}
        <div>

          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Why join ContestHub?
          </h3>

          <p className="text-base-content/70 leading-relaxed">
            ContestHub is built for creators who want to grow, compete, and earn.
            Every contest is a chance to improve your skills, showcase your talent,
            and get rewarded for your creativity. Whether you are a developer,
            designer, or writer — this is your stage to shine.
          </p>

          <button className="btn btn-primary mt-6 px-8 rounded-full">
             Start Competing
          </button>

        </div>

        {/* RIGHT SIDE - WINNERS */}
        <div className="flex justify-center">

          <Swiper
            modules={[Autoplay, EffectCards]}
            effect={"cards"}
            grabCursor={true}
            autoplay={{ delay: 2200, disableOnInteraction: false }}
            className="w-[300px]"
          >
            {winners.map((w, index) => (
              <SwiperSlide key={index}>
                <div className="bg-base-200 rounded-2xl overflow-hidden shadow-xl relative">

                  {/* WINNER BADGE */}
                  <div className="absolute top-3 left-3 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold">
                    👑 WINNER
                  </div>

                  <img
                    src={w.image}
                    alt={w.name}
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-5 text-center">

                    <h4 className="font-bold text-lg">{w.name}</h4>

                    <p className="text-sm text-base-content/70">
                      {w.contest}
                    </p>

                    <div className="mt-3 inline-block bg-primary text-white px-3 py-1 rounded-full text-sm">
                      🏆 Prize: {w.prize}
                    </div>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>

      </div>

      {/* CTA */}
      <div className="text-center mt-14">
        <button className="btn btn-primary btn-lg px-12 rounded-full">
          Join & Become a Winner 
        </button>
      </div>

    </section>
  );
};

export default WinnerAdvertisement;