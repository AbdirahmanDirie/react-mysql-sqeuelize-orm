import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "../redux/auth/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const [register, { data, isError, error, isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (data) {
      toast.success(data.msg);
      window.location.reload();
      navigate("/login");
    }

    if (isError) {
      toast.error(error.data.msg);
    }
  }, [data, isError, error]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ email, password, name });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full">
      <form onSubmit={handleRegister}>
        <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
          <div className="space-y-4">
            <h1 className="text-center text-2xl font-semibold text-gray-600">
              Register
            </h1>
            <hr />

            <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
              <svg
                className="w-6 h-6 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                  clipRule="evenodd"
                />
              </svg>

              <input
                className="pl-2 outline-none border-none w-full"
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none w-full"
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center border-2 py-2 px-3 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none w-full"
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {/* <!-- Remember Me checkbox --> */}
          <div className="flex justify-center items-center mt-4">
            <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
              <input
                type="checkbox"
                id="rememberMeCheckbox"
                name="rememberMe"
                className="mr-2"
              />
              <span className="text-xs font-semibold">Remember me?</span>
            </p>
          </div>

          <button
            type="submit"
            className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-cyan-300 hover:to-blue-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000"
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
          <hr />
          <div className="flex justify-center items-center mt-4">
            <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
              <span className="ml-2">
                You don't have an account?
                <a
                  href="/login"
                  className="text-xs ml-2 text-blue-500 font-semibold"
                >
                  Login now &rarr;
                </a>
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
