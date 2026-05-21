import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";


const AuthLayout = () => {
    return (
        <div>
            <Navbar />

            <div className="min-h-screen flex items-center justify-center">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default AuthLayout;