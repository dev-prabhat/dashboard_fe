import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

// landing page of the app
export const LandingPage = () => {
  const { encodedToken } = useAuth();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Sales <span className="text-indigo-600">Dashboard</span>
        </h1>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Meet your modern{" "}
            <span className="text-indigo-600">
              Sales Management Application
            </span>
          </h2>
          <p className="text-gray-700">
            Struggling to manage your sales data and performance metrics? This
            is your solution. Create an account and streamline your sales
            operations with our powerful dashboard.
          </p>
        </div>
        <div>
          {encodedToken ? (
            <NavLink
              to="/home"
              className="inline-block px-6 py-2 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Go to Dashboard
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="px-6 py-2 text-lg font-semibold text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition-colors"
            >
              Login
            </NavLink>
          )}
        </div>
      </section>
    </main>
  );
};
