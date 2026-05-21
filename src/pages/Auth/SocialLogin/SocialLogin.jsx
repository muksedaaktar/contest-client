// 

import useAuth from "../../../hooks/useAuth";

const SocialLogin = () => {

    const {signInGoogle} =useAuth();

    const handleGoogleSignIn = () =>{
        signInGoogle()
        .then(result =>{
            console.log(result.user)
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