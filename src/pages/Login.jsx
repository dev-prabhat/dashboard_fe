import { useState } from "react";
import { useAuth } from "../context/authContext";

// login page
export const Login = () => {
  const [showPassword, setShowPassword] = useState(Boolean);
  const { loginData, handleLogin, setLoginData } = useAuth();

  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <section className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <form className="space-y-6" onSubmit={handleLogin}>
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Welcome to{" "}
            <span className="text-blue-500">Sales Dashboard App</span>
          </h1>

          <div>
            <label
              htmlFor="emailId"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address:
            </label>
            <input
              id="emailId"
              type="email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="name@gmail.com"
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, email: e.target.value }))
              }
              value={loginData.email}
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="password"
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, password: e.target.value }))
              }
              value={loginData.password}
              required
            />
            {showPassword ? (
              <button
                className="absolute top-1/2 right-4"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                Show
              </button>
            ) : (
              <button
                className="absolute top-1/2 right-4"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                Hide
              </button>
            )}
          </div>

          <div className="flex justify-evenly">
            <p
              className="text-sm text-blue-500 cursor-pointer w-fit"
              onClick={() =>
                setLoginData({
                  email: "singhprabhat@gmail.com",
                  password: "prabhat123",
                })
              }
            >
              User Credentials
            </p>
            <p
              className="text-sm text-blue-500 cursor-pointer w-fit"
              onClick={() =>
                setLoginData({
                  email: "developerprabhat@gmail.com",
                  password: "dev123prabhat",
                })
              }
            >
              Admin Credentials
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
};
