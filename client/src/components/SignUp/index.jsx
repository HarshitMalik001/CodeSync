import React, { useRef } from "react";
import toast from "react-hot-toast";

function Signup(props) {
  const fullnameRef = useRef("");
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const registerUser = async (formValuesObject) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValuesObject),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.data || "Failed to register user");
      }

      const data = await response.json();
      toast.success("User Registered Successfully");
    } catch (error) {
      toast.error(`${error.message || "Error From Server Side"}`);
    }
  };

  const signupSubmitHandler = (event) => {
    event.preventDefault();

    const formValuesObject = {
      fullname: fullnameRef.current.valueOf,
      username: usernameRef.current.valueOf,
      email: emailRef.current.valueOf,
      password: passwordRef.current.valueOf,
      confirmPassword: confirmPasswordRef.current.valueOf,
    };

    if (
      !formValuesObject.fullname ||
      !formValuesObject.username ||
      !formValuesObject.email ||
      !formValuesObject.password ||
      !formValuesObject.confirmPassword
    ) {
      toast.error("Error: All fields are required.");
      return;
    }

    if (formValuesObject.password !== formValuesObject.confirmPassword) {
      toast.error("Error: Passwords do not match.");
      return;
    }

    registerUser(formValuesObject);
  };

  return (
    <section className="flex items-center justify-center bg-gray-900 text-gray-300 mt-14 animate__animated animate__fadeIn">
      <div className="w-full max-w-sm lg:max-w-2xl md:max-w-xl bg-gray-800 py-4 px-8 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
        {/* <h2 className="text-2xl font-bold text-gray-100 text-center mb-6">
          Create Your Account
        </h2> */}
        <form onSubmit={signupSubmitHandler} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                ref={fullnameRef}
                className="w-full border border-gray-700 bg-gray-700 rounded-lg p-2 text-sm text-gray-300 focus:outline-none transform duration-500 ease-in-out hover:scale-105 transition-all hover:border-blue-400"
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                ref={usernameRef}
                className="w-full border border-gray-700 bg-gray-700 rounded-lg p-2 text-sm text-gray-300 focus:outline-none transform duration-500 ease-in-out hover:scale-105 transition-all hover:border-blue-400"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                className="w-full border border-gray-700 bg-gray-700 rounded-lg p-2 text-sm text-gray-300 focus:outline-none transform duration-500 ease-in-out hover:scale-105 transition-all hover:border-blue-400"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                ref={passwordRef}
                className="w-full border border-gray-700 bg-gray-700 rounded-lg p-2 text-sm text-gray-300 focus:outline-none transform duration-500 ease-in-out hover:scale-105 transition-all hover:border-blue-400"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                ref={confirmPasswordRef}
                className="w-full border border-gray-700 bg-gray-700 rounded-lg p-2 text-sm text-gray-300 focus:outline-none transform duration-500 ease-in-out hover:scale-105 transition-all hover:border-blue-400"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <div className="flex items-start mt-3">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 border-gray-600 bg-gray-700 rounded"
              required
            />
            <label htmlFor="terms" className="ml-1 text-sm">
              I agree to the{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 mt-1 text-white rounded-lg hover:bg-blue-700 focus:outline-none transform duration-500 ease-in-out transition-all hover:scale-105"
          >
            Sign Up
          </button>
        </form>
        <div className="text-sm text-center mt-3">
          Already have an account?{" "}
          <button
            onClick={props.Signin}
            className="text-blue-400 hover:underline"
          >
            Log In
          </button>
        </div>
      </div>
    </section>
  );
}

export default Signup;
