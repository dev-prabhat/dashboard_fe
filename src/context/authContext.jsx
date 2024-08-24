import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAxios } from "../customHooks/useAxios";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { response, operation } = useAxios();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [encodedToken, setEncodedToken] = useState(null);

  useEffect(() => {
    let localToken = JSON.parse(localStorage.getItem("encodedToken"));
    if (localToken !== null) {
      setEncodedToken(localToken);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    operation({
      method: "post",
      url: `${apiUrl}/user/loginUser`,
      data: { email: loginData.email, password: loginData.password },
    });
    setLoginData({ email: "", password: "" });
  };

  useEffect(() => {
    if (response !== undefined) {
      localStorage.setItem(
        "encodedToken",
        JSON.stringify(response.data.accessToken)
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setEncodedToken(response.data.accessToken);
    }
  }, [response]);

  const handleLogout = () => {
    setEncodedToken(null);
    localStorage.clear();
    toast.success("Logged out .", { duration: 1000 });
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        encodedToken,
        handleLogin,
        setLoginData,
        loginData,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
