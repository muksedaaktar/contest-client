import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import { useState } from "react";


const Login = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { signInUser } = useAuth()

    // const handleLogin = (data) => {
    //     console.log('login data', data);
    //     signInUser(data.email, data.password)

    //         .then(result => {
    //             console.log(result.user)

    //             Swal.fire({
    //                 title: "Login Successful!",
    //                 text: "Welcome back to ContestHub.🎉",
    //                 icon: "success",
    //                 confirmButtonColor: "#54CF68",
    //             });
    //             navigate("/");
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // };

    const handleLogin = async (data) => {
        setLoading(true);

        try {
            
            await new Promise((resolve) => setTimeout(resolve, 5000));

            const result = await signInUser(data.email, data.password);
            console.log(result);

            Swal.fire({
                title: "Login Successful!",
                text: "Welcome back to ContestHub 🎉",
                icon: "success",
                confirmButtonColor: "#54CF68",
            });

            navigate("/");
        } catch (error) {
            console.log(error);

            Swal.fire({
                title: "Login Failed",
                text: error.message,
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full bg-base-200 py-16 min-h-screen flex items-center">
            <div className="container mx-auto px-5 flex flex-col lg:flex-row items-center gap-12">

                {/* Left Image Area */}
                <motion.div
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <img
                        className="rounded-3xl shadow-2xl w-full object-cover border border-base-300"
                        src="https://cdn.dribbble.com/userupload/9280796/file/original-1fc4985a88c401099c21cf8d556d1d11.png?resize=1024x768&vertical=center"
                        alt="Login visual concept"
                    />
                </motion.div>

                {/* Right Login Form */}
                <motion.div
                    className="w-full lg:w-1/2 bg-base-100 shadow-2xl rounded-3xl p-8 border border-base-300"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >

                    {/* Heading */}
                    <h2 className="text-4xl font-bold text-center mb-3">
                        <span className="text-primary">Welcome</span>{" "}
                        <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Back
                        </span>
                    </h2>

                    <p className="text-base-content/70 text-center mb-8">
                        Login to continue your contest journey.
                    </p>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>

                        {/* Email */}
                        <div>
                            <label className="font-semibold text-base-content">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-3 mt-2 rounded-xl border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />

                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="font-semibold text-base-content">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full p-3 mt-2 rounded-xl border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                            />

                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="text-sm text-primary hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        {/* <button
                            type="submit"
                            className="btn btn-primary w-full rounded-xl text-white text-lg"
                        >
                            Login
                        </button> */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn btn-primary w-full rounded-xl text-white text-lg transition-all duration-300 ${loading ? "opacity-60 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm mr-2"></span>
                                    Logging...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>



                    </form>
                    <SocialLogin></SocialLogin>

                    {/* Register */}
                    <p className="text-center text-base-content/70 mt-6">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-primary font-semibold hover:underline"
                        >
                            Register
                        </Link>
                    </p>

                </motion.div>
            </div>
        </section>
    );
};

export default Login;