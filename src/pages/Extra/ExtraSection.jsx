// import React from "react";
import extraImg from "../../assets/extraImg.jpg"; 

const ExtraSection = () => {
  return (
    <section
      className="relative bg-cover bg-center py-10 mt-10 rounded-2xl"
      style={{ backgroundImage: `url(${extraImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-base-300/70"></div>

      <div className="container mx-auto relative z-10 px-5">
        
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-primary">
          🌟 Extra Features
        </h2>

        <p className="text-base-content/80 font-semibold text-center max-w-4xl mx-auto mb-12 text-lg">
          Explore additional resources and opportunities to enhance your skills.
          Our extra section helps you stay updated, inspired, and ahead in your
          contests journey.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-base-100/80 backdrop-blur-md border border-base-300 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <div className="text-5xl mb-4 text-primary">📚</div>
            <h3 className="text-xl font-bold mb-2  bg-linear-to-r from-[#54CF68] to-[#00827A] bg-clip-text text-transparent">
              Learning Resources
            </h3>
            <p className="text-base-content/70">
              Get access to tutorials, guides, and reference materials for every contest type.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-base-100/80 backdrop-blur-md border border-base-300 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <div className="text-5xl mb-4 text-secondary">🏆</div>
            <h3 className="text-xl font-bold mb-2 bg-linear-to-r from-[#54CF68] to-[#00827A] bg-clip-text text-transparent">
              Achievements
            </h3>
            <p className="text-base-content/70">
              Track your progress, badges, and achievements in past contests to stay motivated.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-base-100/80 backdrop-blur-md border border-base-300 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <div className="text-5xl mb-4 text-accent">💡</div>
            <h3 className="text-xl font-bold mb-2 bg-linear-to-r from-[#54CF68] to-[#00827A] bg-clip-text text-transparent">
              Inspiration
            </h3>
            <p className="text-base-content/70">
              Learn from past winners, read success stories, and get inspired for upcoming contests.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExtraSection;