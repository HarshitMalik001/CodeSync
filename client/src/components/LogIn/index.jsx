import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login(props) {
  const email = useRef("");
  const password = useRef("");
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
        throw new Error(errorData.data || "Failed to log in user");
      }

      const data = await response.json();
      const { accessToken, refreshToken } = data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("isLoggedIn", 1);
      localStorage.setItem("userDetails", JSON.stringify(data.data.user));

      navigate("/meet-room");
      return data.data.user;
    } catch (error) {
      toast.error(`${error.message || "Error: Server"}`);
    }
  };

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    const formValuesObject = {
      email: email.current.value,
      password: password.current.value,
    };
    loginUser(formValuesObject);
  };

  return (
    <section className="flex items-center justify-center bg-slate-900 px-4 text-gray-300 mt-14 ">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg transform hover:scale-105 duration-500 ease-in-out transition-transform animate__animated animate__fadeIn">
        {/* <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
          Login to CodeSync
        </h2> */}
        <form className="space-y-4" onSubmit={loginSubmitHandler}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              ref={email}
              placeholder="example@gmail.com"
              className="transform hover:scale-105 duration-500 ease-in-out transition-transform w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={password}
              placeholder="••••••••"
              className="transform hover:scale-105 duration-500 ease-in-out transition-transform w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className=" w-4 h-4 text-blue-600 border-gray-600 bg-gray-700 rounded focus:ring-2 focus:ring-blue-400"
              required
            />
            <label
              htmlFor="terms"
              className="ml-2 text-sm text-gray-300"
            >
              I accept the{" "}
              <a
                href="#"
                className="text-blue-400 hover:underline"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transform hover:scale-105 duration-500 ease-in-out transition-transform"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-sm text-center text-gray-300">
          Don't have an account?{" "}
          <button
            onClick={props.Register}
            className="text-blue-400 hover:underline"
          >
            Register here
          </button>
        </div>
      </div>
    </section>
  );
}

export default Login;
