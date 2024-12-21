import React, { useRef, useState } from "react";

function Signup(props) {
  const fullnameRef = useRef("");
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState("");


  const registerUser = async (formValuesObject) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValuesObject),
        });

        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.data || "Failed to register user");
        }

        const data = await response.json(); 
        setMessage("User Registered Succesfully");
        setMessageColor("green");
    } catch (error) {
        setMessage(`${error || "Error From Server Side"}`);
        setMessageColor("red");
        console.error("Registration error:", error);
    }
};


  const signupSubmitHandler = async (event) => {
    event.preventDefault();

    const formValuesObject = {
      fullname: fullnameRef.current.value,
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    if (
      !formValuesObject.fullname ||
      !formValuesObject.username ||
      !formValuesObject.email ||
      !formValuesObject.password ||
      !formValuesObject.confirmPassword
    ) {
      setMessage("Error: All fields are required.");
      setMessageColor("red");
      return;
    }

    if (formValuesObject.password !== formValuesObject.confirmPassword) {
      setMessage("Error: Passwords do not match.");
      setMessageColor("red");
      return;
    }

    registerUser(formValuesObject);

  };

  return (
    <>
      <section className="h-max bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4">
        <div className="my-10 w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:space-y-6">
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
                className="brightness-125 text-gray-900 dark:text-gray-200 hover:text-blue-600 focus:outline-none text-lg font-medium px-6 py-2 border-b-2 border-transparent hover:border-blue-600 transition-all"
              >
                Register
              </button>
              <button
                onClick={props.Signin}
                className="brightness-75 text-gray-900 dark:text-gray-200 hover:text-blue-600 focus:outline-none text-lg font-medium px-6 py-2 border-b-2 border-transparent hover:border-blue-600 transition-all"
              >
                Sign In
              </button>
            </div>

            <form className="space-y-4 sm:space-y-6" onSubmit={signupSubmitHandler}>
              <div>
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  ref={fullnameRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  ref={usernameRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required
                />
              </div>

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
                  ref={emailRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example@gmail.com"
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
                  ref={passwordRef}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  ref={confirmPasswordRef}
                  placeholder="••••••••"
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
                    I accept the{" "}
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
                Create an account
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
