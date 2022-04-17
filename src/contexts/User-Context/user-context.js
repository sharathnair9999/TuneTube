import { createContext, useContext, useReducer, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { callAPI } from "../../app-utils";
import { initialUserState, userReducer } from "./user-utils";

const AuthContext = createContext(initialUserState);

const AuthProvider = ({ children }) => {
  const credentials = {
    firstName : "Adarsh",
    lastName : "Balika",
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

  const signUpUser = async (details) => {
    // if (details.password !== details.confirmPassword) {
    //   showAlert("error", "Password doesn't match", 1500);
    //   return;
    // }
    // if (!accept) {
    //   showAlert("error", "Please Accept the Terms & Conditions.", 1500);
    //   return;
    // }

    try {
      const { data } = await callAPI("POST", "/api/auth/signup", details);
      console.log(data);
      const { createdUser } = data;
      const { firstName } = createdUser;
      // showAlert(
      //   "success",
      //   `Welcome to Your Notes Family,  ${capitalize(firstName)}`,
      //   3000
      // );
    } catch (error) {
      console.log(error);
      // showAlert("error", `User Profile already exists!`, 3000);
    }
  };

  useEffect(() => {
    signUpUser(credentials);
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
