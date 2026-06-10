import { motion } from "framer-motion";

const steps = [
  {
    icon: "🧑‍💻",
    title: "Create or Join Contest",
    desc: "Browse available contests or create your own challenge as a creator in just a few clicks.",
  },
  {
    icon: "📤",
    title: "Submit Your Work",
    desc: "Participate in contests by submitting your task, link, or creative solution before deadline.",
  },
  {
    icon: "🏆",
    title: "Win & Get Rewarded",
    desc: "Top submissions are selected as winners and rewarded with prizes and recognition.",
  },
];

const HowItWorks = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 py-16">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl font-extrabold ">
          How It <span className="bg-linear-to-r from-[#54CF68] to-[#00827A] bg-clip-text text-transparent">Works</span>
        </h2>
        <p className="text-base-content/60 mt-3 max-w-2xl mx-auto">
          A simple 3-step process to participate, compete and win exciting rewards on ContestHub.
        </p>
      </motion.div>

      {/* STEPS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-base-100 rounded-3xl shadow-md hover:shadow-xl p-8 text-center border border-base-300"
          >

            {/* ICON */}
            <div className="text-5xl mb-4">{step.icon}</div>

            {/* TITLE */}
            <h3 className="text-xl font-bold mb-2 text-primary">
              {step.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-sm text-base-content/70 leading-relaxed">
              {step.desc}
            </p>

          </motion.div>
        ))}

      </div>

     

    </section>
  );
};

export default HowItWorks;