import React, { useState, useEffect } from 'react';
import Signup from '../../components/SignUp/index';
import Login from '../../components/LogIn/index';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function User() {

    const location = useLocation();
    const navigate = useNavigate();

    function checkLoggedIn(){
        console.log(localStorage.getItem("isLoggedIn") === "1");
        if(localStorage.getItem("isLoggedIn") === "1")
        {
            navigate("/meet-room")
        }
    }
    
    useEffect(() => {
        checkLoggedIn();
    }, [location]);

    const [flagSignup, setFlagSignup] = useState(1);

    const Register = () => setFlagSignup(0);
    const Signin = () => setFlagSignup(1);

    return (
        <div className="flex items-center justify-center h-full bg-gray-900 ">
            <div className="w-full h-full ">
                <div className="flex justify-center gap-4">

                    <button
                        onClick={Register}
                        className={`ml-4 px-4 py-2 text-lg font-semibold border-b-2 transition-all duration-300 ${flagSignup === 0
                            ? 'text-blue-600 border-blue-600'
                            : 'text-white border-transparent hover:text-blue-600 hover:border-blue-600'
                            }`}
                    >
                        Sign Up
                    </button>

                    <button
                        onClick={Signin}
                        className={`px-4 py-2 text-lg font-semibold border-b-2 transition-all duration-300 ${flagSignup === 1
                            ? 'text-blue-600 border-blue-600'
                            : 'text-white border-transparent hover:text-blue-600 hover:border-blue-600'
                            }`}
                    >
                        Sign In
                    </button>
                </div>

                {flagSignup === 0 ? (
                    <Signup Signin={Signin} />
                ) : (
                    <Login Register={Register} />
                )}
            </div>
        </div>
    );
}

export default User;
