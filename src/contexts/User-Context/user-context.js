import { createContext, useContext, useReducer } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { callAPI, capitalize } from "../../app-utils";
import { initialUserState, userReducer, userDetails } from "./user-utils";

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
      userDispatch({
        type: "LOGIN_USER",
        payload: { firstName, lastName },
      });
      localStorage.setItem(
        "userToken",
        JSON.stringify({ encodedToken, firstName, lastName })
      );
    } catch (error) {
      toast.error("Could not login at this moment!");
    }
  };

  const signUpUser = async (details) => {
    try {
      const {
        data: { createdUser },
      } = await callAPI("POST", "/api/auth/signup", details);

      toast.success(
        `Welcome to UnboxTube ${capitalize(createdUser.firstName)} ${capitalize(
          createdUser.lastName
        )}`
      );
    } catch (error) {
      toast.error("This user already exists");
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("userToken");
    userDispatch({ type: "LOGOUT_USER" });
    toast.success("Logged Out Successfully");
    console.log(userDetails);
  };

  const getAllLikedVideos = async () => {
    try {
      const {
        data: { likes },
      } = await callAPI(
        "GET",
        "/api/user/likes",
        null,
        userDetails?.encodedToken
      );
      console.log(likes);
      userDispatch({ type: "LIKED_VIDEOS", payload: likes });
    } catch (error) {
      toast.error("Error Retrieving Liked Videos");
    }
  };

  const addToLikedVideos = async (video) => {
    try {
      const {
        data: { likes },
      } = await callAPI(
        "POST",
        "/api/user/likes",
        { video },
        userDetails?.encodedToken
      );
      userDispatch({ type: "LIKED_VIDEOS", payload: likes });
      toast.success("Video Added to Likes");
    } catch (error) {
      toast.error("Couldn't like the video");
    }
  };
  const removeFromLikedVideos = async (_id) => {
    try {
      const {
        data: { likes },
      } = await callAPI(
        "DELETE",
        `/api/user/likes/${_id}`,
        null,
        userDetails?.encodedToken
      );
      userDispatch({ type: "LIKED_VIDEOS", payload: likes });
      toast.success("Video Removed From Likes");
    } catch (error) {
      toast.error("Seems you are not sure disliking!");
    }
  };

  const value = {
    userState,
    userDispatch,
    loginUser,
    signUpUser,
    logoutUser,
    getAllLikedVideos,
    addToLikedVideos,
    removeFromLikedVideos,
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
