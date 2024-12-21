import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


function Login(props) {
    const email = useRef("");
    const password = useRef("");
    const [message, setMessage] = useState(null);
    const [messageColor, setMessageColor] = useState("");
    const navigate = useNavigate();

    const loginUser = async (loginValues) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", 
                body: JSON.stringify(loginValues),
            });
    
            if (!response.ok) {
                const errorData = await response.json(); 
                console.log(errorData);
                throw new Error(errorData.data || "Failed to log in user");
            }
    
            const data = await response.json();
            console.log("User logged in successfully:", data);
    
    
            const { accessToken, refreshToken } = data.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("isLoggedIn", 1);
            localStorage.setItem("userDetails", JSON.stringify(data.data.user));
            
            console.log(data.data.user);
            navigate("/meet-room");
    
            return data.data.user;
        } catch (error) {
            setMessage(`${ error || "Error: Server"}`);
            setMessageColor("red");
            console.error("Login error:", error);
        }
    };
    

    const loginSubmitHandler = (event) => {
        event.preventDefault();

        var formValuesObject = {
            email: email.current.value,
            password: password.current.value,
        };
        loginUser(formValuesObject);

        // setMessage("Error: Passwords do not match.");
        // setMessageColor("red");
    }

    return (
        <>
            <section className="bg-gray-50 overflow-y-hidden dark:bg-gray-900  z-0">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            {/* Message Block */}
                            {message && (
                                <div
                                    className={`p-4 mb-4 text-sm rounded-lg border`}
                                    style={{
                                        backgroundColor: messageColor === "green" ? "#eafaf1" : "#fbeaea",
                                        color: messageColor === "green" ? "#064e3b" : "#7f1d1d",
                                        borderColor: messageColor === "green" ? "#d1fae5" : "#fecaca",
                                        textAlign: "center",
                                    }}
                                >
                                    {message}
                                </div>
                            )}
                            <div className="mb-6 flex space-x-8 justify-center">
                                <button
                                    onClick={props.Register}
                                    className="brightness-75 text-gray-900 dark:text-gray-200 hover:text-blue-600 focus:outline-none text-lg font-medium px-6 py-2 border-b-2 border-transparent hover:border-blue-600 transition-all"                                >
                                    Register
                                </button>
                                <button
                                    onClick={props.Signin}
                                    className="brightness-125 text-gray-900 dark:text-gray-200 hover:text-blue-600 focus:outline-none text-lg font-medium px-6 py-2 border-b-2 border-transparent hover:border-blue-600 transition-all"
                                >
                                    Sign In
                                </button>
                            </div>
                            <form className="space-y-4 md:space-y-6" onSubmit={loginSubmitHandler}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        ref={email}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Example@gmail.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        ref={password}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            aria-describedby="terms"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="terms"
                                            className="font-light text-gray-500 dark:text-gray-300"
                                        >
                                            I accept the{' '}
                                            <a
                                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                                href="#"
                                            >
                                                Terms and Conditions
                                            </a>
                                        </label>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Login To CodeSync
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Login;