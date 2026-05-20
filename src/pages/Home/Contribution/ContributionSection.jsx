// import React from "react";
import { motion } from "framer-motion";

/* Parent container for stagger */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

/* Card animation */
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90 },
  },
};

const ContributionSection = () => {
  return (
    <section className="bg-base-200 py-20 rounded-3xl my-20">
      <div className="container mx-auto px-5">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold">
             ContestHub <span className="text-primary">Community</span> Impact
          </h1>

          <p className="text-base-content/70 max-w-2xl mx-auto mt-4 leading-relaxed">
            Thousands of creators, developers, designers, and innovators
            are competing, learning, and winning every day on ContestHub.
            Our growing community is turning talent into real opportunities.
          </p>
        </motion.div>

        {/* Content */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-14">

          {/* LEFT SIDE IMAGE */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative">

              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1170&auto=format&fit=crop"
                alt="ContestHub Community"
                className="rounded-3xl shadow-2xl h-[500px] w-full object-cover"
              />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-base-100/90 backdrop-blur-md px-5 py-4 rounded-2xl shadow-xl">
                <h1 className="text-3xl font-extrabold text-primary">
                  50K+
                </h1>
                <p className="text-sm text-base-content/70">
                  Prize Money Distributed
                </p>
              </div>

            </div>
          </motion.div>

          {/* RIGHT SIDE CARDS */}
          <motion.div
            className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              {
                icon: "🏆",
                title: "Total Winners",
                value: "1,200+",
              },
              {
                icon: "👨‍💻",
                title: "Active Creators",
                value: "8,500+",
              },
              {
                icon: "🎯",
                title: "Live Contests",
                value: "24+",
              },
              {
                icon: "💰",
                title: "Rewards Paid",
                value: "$50K+",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                }}
                className="bg-base-100 p-7 rounded-3xl shadow-lg border border-base-300 hover:border-primary duration-300 cursor-pointer"
              >

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#54CF68] to-[#00827A] flex items-center justify-center text-2xl mb-4 text-white shadow-lg">
                  {item.icon}
                </div>

                <h1 className="text-lg font-semibold mb-2">
                  {item.title}
                </h1>

                <p className="text-3xl lg:text-4xl font-extrabold text-primary">
                  {item.value}
                </p>

              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContributionSection;