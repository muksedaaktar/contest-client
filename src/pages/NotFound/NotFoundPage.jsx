
import { Link } from "react-router-dom";
import bgImage from "../../assets/404.jpg";

const NotFoundPage = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-base-100 relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      {/* dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* content */}
      <div className="relative text-center px-4">

        <h1 className="text-7xl font-extrabold text-primary mb-4">
          404
        </h1>

        <p className="text-2xl md:text-3xl font-semibold mb-4">
          Oops! This page disappeared from the contest arena 🏆
        </p>

        <p className="text-base-content/70 mb-6 max-w-md mx-auto">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back to the contests.
        </p>

        <Link
          to="/"
          className="px-6 py-3 rounded-full 
          bg-linear-to-r from-[#54CF68] to-[#00827A] 
          text-white font-semibold shadow-lg hover:opacity-90 transition"
        >
          Go Back Home
        </Link>

      </div>

    </div>
  );
};

export default NotFoundPage;