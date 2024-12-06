import React from 'react';
import logo from './images/logo.png';
import IconHome from './icons/IconHome';
import IconCreate from './icons/IconCreate';
import IconMenuUnfold from './icons/IconMenuUnFold';

const Header = () => {
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
                    Lobby
                    <IconHome className="h-6 w-6" />
                </button>

                {/* Create Room Button */}
                <button className="hover:text-red-400 transition-all duration-300 ease-in-out pb-1 border-b-2 border-transparent flex justify-center items-center gap-2">
                    Create Room
                    <IconCreate className="h-6 w-6" />
                </button>
            </div>

            {/* Mobile Navigation (Hamburger, etc.) */}
            <div className="lg:hidden flex items-center gap-4">
                <button className="text-xl"><IconMenuUnfold></IconMenuUnfold></button>
            </div>
        </header>
    );
};

export default Header;
