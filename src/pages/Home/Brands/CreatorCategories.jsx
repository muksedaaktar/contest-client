// import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

import { FaCode, FaPaintBrush, FaPenNib, FaCamera, FaRobot, FaGamepad } from 'react-icons/fa';

const CreatorCategories = () => {
  const categories = [
    {
      name: "Coding",
      icon: <FaCode />,
      desc: "Hackathons & Programming",
    },
    {
      name: "Design",
      icon: <FaPaintBrush />,
      desc: "UI/UX & Creative Design",
    },
    {
      name: "Writing",
      icon: <FaPenNib />,
      desc: "Stories & Content Writing",
    },
    {
      name: "Photography",
      icon: <FaCamera />,
      desc: "Capture & Visual Arts",
    },
    {
      name: "AI / ML",
      icon: <FaRobot />,
      desc: "Artificial Intelligence",
    },
    {
      name: "Gaming",
      icon: <FaGamepad />,
      desc: "Game Challenges",
    },
  ];

  return (
    <div className="py-10 bg-base-100">

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Explore <span className="bg-linear-to-r from-[#54CF68] to-[#00827A] bg-clip-text text-transparent">Creator Categories</span>
        </h2>
        <p className="text-base-content/70 mt-2">
          Join contests based on your passion and skills
        </p>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >

        {categories.map((cat, index) => (
          <SwiperSlide key={index}>
            <div className="p-6 rounded-2xl bg-base-200 hover:bg-base-300 transition duration-300 shadow-sm hover:shadow-md text-center">

              {/* Icon */}
              <div className="text-4xl text-primary flex justify-center mb-3">
                {cat.icon}
              </div>

              {/* Name */}
              <h3 className="text-lg font-bold">
                {cat.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-base-content/70 mt-1">
                {cat.desc}
              </p>

            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
};

export default CreatorCategories;