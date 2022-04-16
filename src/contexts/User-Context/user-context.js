import { createContext, useContext, useReducer, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { callAPI } from "../../app-utils";
import { initialUserState, userReducer } from "./user-utils";

const AuthContext = createContext(initialUserState);

const AuthProvider = ({ children }) => {
  const credentials = {
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
  };

  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  const loginUser = async (credentials) => {
    try {
      const { data } = await callAPI("POST", "/api/auth/login", credentials);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loginUser(credentials);
  }, []);

  const value = { userState, userDispatch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const RequireAuth = ({ children }) => {
  const { userState } = useAuth();
  const location = useLocation();
  if (!userState.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
const RedirectLoggedInUser = ({ children }) => {
  const { userState } = useAuth();
  const location = useLocation();
  if (userState.isLoggedIn) {
    return <Navigate to={"/"} replace state={{ from: location }} />;
  }
  return children;
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider, RequireAuth, RedirectLoggedInUser };
