import React, { useEffect, useState } from "react";
import logo from './images/logo.png';
import IconHome from './icons/IconHome';
import IconCreate from './icons/IconCreate';
import IconMenuUnfold from './icons/IconMenuUnFold';
import IconUser from './icons/IconUser';
import IconLogout from './icons/IconLogout';
import { isUserLoggedIn, logout } from './utils/helper';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import IconLogin from "./icons/IconLogin";

const logoutAPI = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to logout");

        const data = await response.json();
        console.log("Logout successful:", data);
    } catch (error) {
        console.log("Error during logout:", error);
    }
};

const Header = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Track if menu is open on mobile
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(isUserLoggedIn());
    }, [location]);

    function logoutHandler() {
        logout();
        setIsLoggedIn(isUserLoggedIn());
        logoutAPI();
        navigate("/");
    }

    return (
        <header className="h-full bg-gray-900 text-white flex justify-between items-center py-2 px-5 sm:px-8 md:px-12 transition-all">

            {/* Logo */}
            <div className="flex gap-4 items-center">
                <button className="flex items-center gap-4 transform transition-all duration-500 ease-in-out hover:scale-105 hover:bg-opacity-50 p-2 rounded-lg">
                    <h3 className="flex items-center gap-4 text-2xl font-bold animate__animated animate__fadeIn">
                        <img src={logo} alt="Logo" className="h-10 transition-all duration-300 ease-in-out transform hover:scale-110" />
                        <span className="text-white transition-all duration-300 ease-in-out transform hover:text-gray-400">CodeMeet</span>
                    </h3>
                </button>
            </div>


            <div className="flex items-center gap-8">
                <button className="flex items-center justify-center gap-2 transform transition-all duration-300 ease-in-out hover:scale-105 font-semibold hover:text-gray-400 animate__animated animate__fadeIn ">
                    <IconUser className=" transform transition-all duration-300 ease-in-out hover:scale-110  " />
                    {isLoggedIn ? (
                        JSON.parse(localStorage.getItem("userDetails"))?.fullname
                    ) : (
                        ""
                    )}
                </button>
                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    {isLoggedIn && (
                        <button
                            className="flex items-center justify-center gap-2 transform transition-all duration-300 ease-in-out hover:scale-105 hover:text-red-400 font-semibold pb-1 border-b-2 border-transparent animate__animated animate__fadeIn "
                            onClick={logoutHandler}
                        >
                            <IconLogout className="h-6 w-6 transform transition-all duration-300 ease-in-out hover:scale-110" />
                        </button>
                    )}
                </div>

                {/* Mobile Navigation */}
                <div className="relative lg:hidden flex items-center gap-4">
                    <IconMenuUnfold setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />

                    {/* Mobile Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute top-14 right-1 bg-gray-700 text-white p-4 rounded-md shadow-lg flex flex-col gap-4 z-0 ">
                            <div>
                                {isLoggedIn && (
                                    <button className="hover:text-red-400 transition-all duration-300 ease-in-out flex justify-center items-end gap-2" onClick={logoutHandler}>
                                        <IconLogout className="h-6 w-6" />
                                    </button>

                                )}
                            </div>

                        </div>
                    )}
                </div>
            </div>




        </header>
    );
};

export default Header;
