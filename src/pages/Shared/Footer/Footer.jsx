// import React from 'react';

import {
    FaYoutube,
    FaLinkedin,
    FaFacebook,
} from 'react-icons/fa';
import Logo from '../../../component/Logo/Logo';
import { NavLink } from 'react-router';

const Footer = () => {
    return (
        <footer className="mt-16 bg-base-200 border-t border-base-300">

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                {/* Logo & Description */}
                <aside className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-5">
                  <Logo></Logo>

                        <h2 className="text-3xl font-extrabold dancing-script">
                            <span className="text-primary">Con</span>
                            <span className="bg-linear-to-r from-[#54CF68] to-[#00827A] bg-clip-text text-transparent">
                                TestHub
                            </span>
                        </h2>
                    </div>

                    <p className="text-base-content/80 leading-7 text-base max-w-sm">
                        Discover exciting contests, showcase your creativity,
                        compete with talented people, and grow your skills in one
                        modern platform.
                    </p>

                    {/* CTA */}
                    <NavLink to = "/all-contests" className="btn btn-primary mt-6 rounded-xl px-6">
                         
                        Explore Contests
                    
                    </NavLink>
                </aside>

                {/* Services */}
                <nav className="space-y-3">
                    <h6 className="text-lg font-bold text-primary mb-4">
                        Services
                    </h6>

                    <a className="block hover:text-primary transition duration-300 cursor-pointer">
                        Contest Creation
                    </a>

                    <a className="block hover:text-primary transition duration-300 cursor-pointer">
                        Live Competitions
                    </a>

                    <a className="block hover:text-primary transition duration-300 cursor-pointer">
                        Leaderboards
                    </a>

                    <a className="block hover:text-primary transition duration-300 cursor-pointer">
                        Prize Management
                    </a>
                </nav>

                {/* Company */}
                <nav className="space-y-3">
                    <h6 className="text-lg font-bold text-primary mb-4">
                        Company
                    </h6>

                    <a className="block hover:text-primary transition duration-300 cursor-pointer">
                        About Us
                    </a>

                    <a className="block hover:text-primary transition duration-300 cursor-pointer">
                        Careers
                    </a>

                    <a className="block hover:text-primary transition duration-300 cursor-pointer">
                        Contact
                    </a>

                    <a className="block hover:text-primary transition duration-300 cursor-pointer">
                        Press Kit
                    </a>
                </nav>

                {/* Social */}
                <nav>
                    <h6 className="text-lg font-bold text-primary mb-4">
                        Connect
                    </h6>

                    <div className="flex gap-4">

                        <a
                            href="#"
                            className="w-11 h-11 rounded-xl bg-base-100 hover:bg-primary hover:text-white flex items-center justify-center transition duration-300 shadow-sm"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932L18.901 1.153Zm-1.29 19.494h2.039L6.486 3.24H4.298l13.313 17.407Z" />
                            </svg>
                        </a>

                        <a
                            href="#"
                            className="w-11 h-11 rounded-xl bg-base-100 hover:bg-primary hover:text-white flex items-center justify-center transition duration-300 shadow-sm"
                        >
                            <FaYoutube size={18} />
                        </a>

                        <a
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-xl bg-base-100 hover:bg-primary hover:text-white flex items-center justify-center transition duration-300 shadow-sm"
                        >
                            <FaLinkedin size={18} />
                        </a>

                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-xl bg-base-100 hover:bg-primary hover:text-white flex items-center justify-center transition duration-300 shadow-sm"
                        >
                            <FaFacebook size={18} />
                        </a>

                    </div>
                </nav>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-base-300">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-base-content/70">

                    <p>
                        © {new Date().getFullYear()} ContestHub. All rights reserved.
                    </p>

                    <div className="flex gap-5">
                        <a className="hover:text-primary transition duration-300 cursor-pointer">
                            Terms
                        </a>

                        <a className="hover:text-primary transition duration-300 cursor-pointer">
                            Privacy
                        </a>

                        <a className="hover:text-primary transition duration-300 cursor-pointer">
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;