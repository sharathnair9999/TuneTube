import { createContext, useContext, useReducer } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { callAPI, capitalize } from "../../app-utils";
import { initialUserState, userReducer } from "./user-utils";

const AuthContext = createContext(initialUserState);

const AuthProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  const testUser = {
    email: "adarshbalika@gmail.com",
    password: "adarshBalika123",
  };

  const loginUser = async (credentials) => {
    try {
      const {
        data: {
          encodedToken,
          foundUser: { firstName, lastName },
        },
      } = await toast.promise(callAPI("POST", "/api/auth/login", credentials), {
        pending: "Logging You In",
        error: "Could not login",
        success: `Logged In Successfully`,
      });
      localStorage.setItem(
        "userToken",
        JSON.stringify({ encodedToken, firstName, lastName })
      );
      userDispatch({ type: "LOGIN_USER", payload: { firstName, lastName } });
    } catch (error) {
      console.log(error);
    }
  };

  const signUpUser = async (details) => {
    try {
      const {
        data: { createdUser, encodedToken },
      } = await callAPI("POST", "/api/auth/signup", details);

      toast.success(
        `Welcome to UnboxTube ${capitalize(createdUser.firstName)} ${capitalize(
          createdUser.lastName
        )}`
      );
      console.log(encodedToken);
    } catch (error) {
      toast.error("This user already exists");
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("userToken");
    userDispatch({ type: "LOGOUT_USER" });
    toast.success("Logged Out Successfully")
  };

  const value = {
    userState,
    userDispatch,
    loginUser,
    signUpUser,
    logoutUser,
    testUser,
  };

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
