import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";

const Register = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { registerUser } = useAuth()

    const handleRegistration = (data) => {
        console.log('after register', data);
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user)

                Swal.fire({
                    title: "Registration Successful!",
                    text: "Your ccount has been created successfully.🎉",
                    icon: "success",
                    confirmButtonColor: "#54CF68",
                });
                navigate("/")
            })
            .catch(error => {
                console.log(error)
            })
    };

    return (
        <section className="min-h-screen bg-base-200 py-16 flex items-center">
            <div className="container mx-auto px-5">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left Image */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative">
                            <img
                                className="rounded-3xl shadow-2xl w-full object-cover"
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1170&auto=format&fit=crop"
                                alt="Register"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-linear-to-r from-[#54CF68]/70 to-[#00827A]/70 rounded-3xl"></div>

                            {/* Text */}
                            <div className="absolute inset-0 flex flex-col justify-center p-10 text-white">
                                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
                                    Start Your <br /> Contest Journey
                                </h1>

                                <p className="text-lg text-white/90 max-w-md">
                                    Join ContestHub and explore exciting competitions,
                                    creative challenges, and opportunities to showcase your talent.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Register Form */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-base-100 rounded-3xl shadow-2xl p-8 md:p-10 border border-base-300">

                            {/* Heading */}
                            <div className="text-center mb-8">
                                <h2 className="text-4xl font-extrabold mb-3">
                                    Create Account
                                </h2>

                                <p className="text-base-content/70">
                                    Register now and become part of the ContestHub community.
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">

                                {/* Name */}
                                <div>
                                    <label className="font-semibold mb-2 block">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="input input-bordered w-full rounded-xl bg-base-100"
                                        {...register("name", {
                                            required: "Name is required",
                                        })}
                                    />

                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="font-semibold mb-2 block">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="input input-bordered w-full rounded-xl bg-base-100"
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

                                {/* Photo URL */}
                                <div>
                                    <label className="font-semibold mb-2 block">
                                        Photo URL
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter profile image URL"
                                        className="input input-bordered w-full rounded-xl bg-base-100"
                                        {...register("photoURL")}
                                    />
                                </div>

                                {/* Password */}
                                {/* Password */}
                                <div>
                                    <label className="font-semibold mb-2 block">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        placeholder="Create a password"
                                        className="input input-bordered w-full rounded-xl bg-base-100"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters",
                                            },
                                            pattern: {
                                                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                                                message:
                                                    "Password must contain at least one uppercase letter and one special character",
                                            },
                                        })}
                                    />

                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Terms */}
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary"
                                        {...register("terms", {
                                            required: "You must accept terms",
                                        })}
                                    />

                                    <p className="text-sm">
                                        I agree to the Terms & Conditions
                                    </p>
                                </div>

                                {errors.terms && (
                                    <p className="text-red-500 text-sm">
                                        {errors.terms.message}
                                    </p>
                                )}

                                {/* Button */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full rounded-xl text-white text-lg"
                                >
                                    Register Now
                                </button>
                                <SocialLogin></SocialLogin>
                            </form>

                            {/* Footer */}
                            <p className="text-center mt-6 text-base-content/70">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-bold text-primary hover:underline"
                                >
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