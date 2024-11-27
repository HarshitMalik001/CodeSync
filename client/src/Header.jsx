import React from 'react';
import logo from './images/logo.png';
import IconHome from './icons/IconHome';
import IconCreate from './icons/IconCreate';


const Header = () => {
    return (
        <header className="bg-gray-900 text-white flex justify-between items-center border-b border-black py-2 px-5">
            <div className=" flex gap-4 items-center">
                {/* Logo */}
                <button className="flex items-center gap-4">
                    <h3 className="flex items-center gap-4 text-2xl font-bold">
                        <img src={logo} alt="Logo" className="h-10" />
                        <span>Mumble</span>
                    </h3>
                </button>
            </div>

            <div>
                MEET ID : 12345-xyz-w
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-8">
                {/* Lobby Link */}
                <button className="hover:text-red-400 transition-all duration-300 ease-in-out pb-1 border-b-2 border-transparent flex justify-center items-center gap-2">
                    Lobby
                    <IconHome className="h-6 w-6"/>
                </button>

                {/* Create Room Button */}
                <button className="hover:text-red-400 transition-all duration-300 ease-in-out pb-1 border-b-2 border-transparent flex justify-center items-center gap-2">
                    Create Room
                    <IconCreate className="h-6 w-6"/>
                </button>
            </div>
        </header>
    );
};

export default Header;
