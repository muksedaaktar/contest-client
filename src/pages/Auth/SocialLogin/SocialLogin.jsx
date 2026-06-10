// 

import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const SocialLogin = () => {

    const navigate = useNavigate();

    const { signInGoogle } = useAuth();

    const handleGoogleSignIn = () => {
        signInGoogle()
            .then(async (result) => {

                const loggedUser = result.user;

                const userInfo = {
                    name: loggedUser.displayName,
                    email: loggedUser.email,
                    photo: loggedUser.photoURL,
                    role: "user",
                };

                await fetch("https://contest-server-lyart.vercel.app/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(userInfo),
                });

                Swal.fire({
                    title: "Google Login Successful!",
                    text: "Welcome back to ContestHub 🎉",
                    icon: "success",
                    confirmButtonColor: "#54CF68",
                });

                navigate("/");
            })

            .catch(error => {
                console.log(error)
            })

    }

    return (
        <div>
            <div className="divider text-base-content/50">
                OR
            </div>

            {/* Social Login UI */}
            <button onClick={handleGoogleSignIn}
                type="button"
                // onClick={handleGoogleLogin}
                className="btn btn-primary w-full rounded-xl text-white text-lg"
            >
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className="w-5 h-5"
                    alt="Google"
                />
                Continue with Google
            </button>
        </div>
    );
};

export default SocialLogin;