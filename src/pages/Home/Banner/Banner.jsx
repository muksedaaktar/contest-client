// import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from '../../../assets/banner-1.jpg';
import bannerImg2 from '../../../assets/banner-2.jpg';
import bannerImg3 from '../../../assets/banner.jpg';

const Banner = () => {
  return (
    <div className="px-4 mt-10">

      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        interval={4000}
      >

        {/* Slide 1 */}
        <div className="relative rounded-3xl overflow-hidden">
          <img className="h-[80vh] object-cover w-full" src={bannerImg1} />

          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Join Creative Contests
            </h1>

            <p className="text-gray-200 mb-6 max-w-xl text-xl">
              Compete, create and win exciting prizes with talented people worldwide.
            </p>

            <div className="flex w-full max-w-md bg-white rounded-full overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="Search contests..."
                className="w-full px-4 py-3 outline-none"
              />
              <button className="bg-gradient-to-r from-[#54CF68] to-[#00827A] text-white px-6">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative rounded-3xl overflow-hidden">
          <img className="h-[80vh] object-cover w-full" src={bannerImg2} />

          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Showcase Your Skills
            </h1>

            <p className="text-gray-200 mb-6 max-w-xl text-xl">
              Participate in coding, design, writing and photography contests.
            </p>

            <div className="flex w-full max-w-md bg-white rounded-full overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="Search contests..."
                className="w-full px-4 py-3 outline-none"
              />
              <button className="`bg-gradient-to-r` from-[#54CF68] to-[#00827A] text-white px-6">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative rounded-3xl overflow-hidden">
          <img className="h-[80vh] object-cover w-full" src={bannerImg3} />

          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Win Real Rewards
            </h1>

            <p className="text-gray-200 mb-6 max-w-xl text-xl">
              Compete in challenges and earn prizes, recognition and growth.
            </p>

            <div className="flex w-full max-w-md bg-white rounded-full overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="Search contests..."
                className="w-full px-4 py-3 outline-none"
              />
              <button className="`bg-gradient-to-r` from-[#54CF68] to-[#00827A] text-white px-6">
                Search
              </button>
            </div>
          </div>
        </div>

      </Carousel>
    </div>
  );
};

export default Banner;