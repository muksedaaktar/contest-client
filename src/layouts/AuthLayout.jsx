
import { Outlet } from "react-router";
import Logo from "../component/Logo/Logo";

const AuthLayout = () => {
    return (
        <div className="max-w-7xl mx-auto mt-20 ">
            <div className="flex items-center gap-2 mb-5">
                <Logo></Logo>
            <h1 className="text-2xl font-extrabold">
                <span className="text-primary">Con</span>
                <span className="bg-linear-to-r from-[#54CF68] to-[#00827A] bg-clip-text text-transparent">
                    TestHub
                </span>
            </h1>
            </div>
            <div>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default AuthLayout;