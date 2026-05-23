import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 👉 Save to MongoDB
  const saveUserToDB = async (userInfo) => {
    await fetch("https://contest-server-lyart.vercel.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
  };

  const handleRegistration = async (data) => {
    try {
      // 1️⃣ Firebase register
      const result = await registerUser(data.email, data.password);
      const user = result.user;

      // 2️⃣ Update Firebase profile (IMPORTANT FIX)
      await updateProfile(user, {
        displayName: data.name,
        photoURL: data.photoURL,
      });

      // 3️⃣ MongoDB user save (FIXED FIELD)
      const userInfo = {
        name: data.name,          // ✅ FIXED (was wrong before)
        email: data.email,
        photoURL: data.photoURL,
        role: "user",
        createdAt: new Date(),
      };

      await saveUserToDB(userInfo);

      // 4️⃣ Success alert
      Swal.fire({
        title: "Registration Successful 🎉",
        text: "Welcome to ContestHub!",
        icon: "success",
        confirmButtonColor: "#54CF68",
      });

      navigate("/");
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Error",
        text: error.message || "Registration failed",
        icon: "error",
      });
    }
  };

  return (
    <section className="min-h-screen bg-base-200 py-16 flex items-center">
      <div className="container mx-auto px-5">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* LEFT IMAGE */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              className="rounded-3xl shadow-2xl w-full object-cover"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1170&auto=format&fit=crop"
              alt="Register"
            />
          </motion.div>

          {/* FORM */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-base-100 rounded-3xl shadow-2xl p-8">

              <h2 className="text-4xl font-bold text-center mb-6">
                Create Account
              </h2>

              <form
                onSubmit={handleSubmit(handleRegistration)}
                className="space-y-5"
              >

                {/* NAME */}
                <div>
                  <label className="font-semibold">Full Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <label className="font-semibold">Email</label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* PHOTO URL */}
                <div>
                  <label className="font-semibold">Photo URL</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    {...register("photoURL", {
                      required: "Photo URL is required",
                    })}
                  />
                  {errors.photoURL && (
                    <p className="text-red-500 text-sm">
                      {errors.photoURL.message}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="font-semibold">Password</label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters required",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* TERMS */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("terms", {
                      required: true,
                    })}
                  />
                  <span>I agree to terms</span>
                </div>

                {/* SUBMIT */}
                <button className="btn btn-primary w-full">
                  Register
                </button>

              </form>

              <SocialLogin />

              <p className="text-center mt-4">
                Already have account?{" "}
                <Link to="/login" className="text-primary">
                  Login
                </Link>
              </p>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Register;