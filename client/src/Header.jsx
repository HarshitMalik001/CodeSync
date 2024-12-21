import React, { useEffect, useRef, useState } from "react";
import logo from './images/logo.png';
import IconHome from './icons/IconHome';
import IconCreate from './icons/IconCreate';
import IconMenuUnfold from './icons/IconMenuUnFold';
import IconUser from './icons/IconUser';
import IconLogout from './icons/IconLogout';
import { isUserLoggedIn, logout } from './utils/helper';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const logoutAPI = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies are sent
      });
  
      if (!response.ok) {
        throw new Error("Failed to logout");
      }
  
      const data = await response.json();
      console.log("Logout successful:", data);
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

const Header = () => {
    // window.location.reload();
    const location = useLocation();
    const [isLoggedIn, setisLoggedIn] = useState(isUserLoggedIn());
    const navigate = useNavigate();

    useEffect(() => {
        setisLoggedIn(isUserLoggedIn());
      }, [location]);

    function logoutHandler(){
        logout();
        setisLoggedIn(isUserLoggedIn());
        logoutAPI();
        navigate("/");
    }
    
    return (
        <header className="bg-gray-900 text-white flex justify-between items-center border-b border-black py-2 px-5 md:px-10 lg:px-16">
            <div className="flex gap-4 items-center">
                {/* Logo */}
                <button className="flex items-center gap-4">
                    <h3 className="flex items-center gap-4 text-2xl font-bold">
                        <img src={logo} alt="Logo" className="h-10" />
                        <span>Mumble</span>
                    </h3>
                </button>
            </div>

            {/* Meet ID Display */}
            <div className="hidden md:block text-sm">
                MEET ID : 12345-xyz-w
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
                {/* Lobby Link */}
                <button className="hover:text-red-400 transition-all duration-300 ease-in-out pb-1 border-b-2 border-transparent flex justify-center items-center gap-2">
                    {isLoggedIn? (
                        JSON.parse(localStorage.getItem("userDetails"))?.fullname
                    ): (
                        "User"
                    )}
                    <IconUser className="h-6 w-6" />
                </button>

                {/* Create Room Button */}
                    {isLoggedIn? (
                        <button className="hover:text-red-400 transition-all duration-300 ease-in-out pb-1 border-b-2 border-transparent flex justify-center items-center gap-2" onClick={logoutHandler}>
                        Logout
                        <IconLogout className="h-6 w-6" /> </button>
                    ): (
                        <button className="hover:text-red-400 transition-all duration-300 ease-in-out pb-1 border-b-2 border-transparent flex justify-center items-center gap-2">
                        Login
                        <IconLogout className="h-6 w-6" /></button>
                    )}
                    
            </div>

            {/* Mobile Navigation (Hamburger, etc.) */}
            <div className="lg:hidden flex items-center gap-4">
                <button className="text-xl"><IconMenuUnfold></IconMenuUnfold></button>
            </div>
        </header>
    );
};

export default Header;
