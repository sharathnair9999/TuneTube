import { createContext, useContext, useReducer, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { callAPI, capitalize } from "../../app-utils";
import { initialUserState, userReducer } from "./user-utils";

const AuthContext = createContext(initialUserState);

const AuthProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const navigate = useNavigate();

  const testUser = {
    email: "adarshbalika@gmail.com",
    password: "adarshBalika123",
  };

  const userDetails = JSON.parse(localStorage.getItem("userToken")) || {
    encodedToken: null,
    firstName: null,
    lastName: null,
  };

  const loginUser = async (credentials) => {
    try {
      const {
        data: {
          encodedToken,
          foundUser: {
            firstName,
            lastName,
            likes,
            watchlater,
            history,
            playlists,
          },
        },
      } = await callAPI("POST", "/api/auth/login", credentials);
      localStorage.setItem(
        "userToken",
        JSON.stringify({
          encodedToken: encodedToken,
          firstName: firstName,
          lastName: lastName,
        })
      );
      userDispatch({
        type: "LOGIN_USER",
        payload: {
          firstName: firstName,
          lastName: lastName,
          encodedToken: encodedToken,
          likes: likes,
          watchlater: watchlater,
          history: history,
          playlists: playlists,
        },
      });
      navigate(-1);
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

  const getUserHistory = async () => {
    if (!userState.isLoggedIn || !userDetails) {
      return;
    }
    try {
      const {
        data: { history },
      } = await callAPI(
        "GET",
        "/api/user/history",
        null,
        userDetails?.encodedToken
      );
      userDispatch({ type: "HISTORY", payload: history });
    } catch (error) {
      toast.error("Problem in retrieving your history!");
    }
  };

  const getUserWatchLater = async () => {
    if (!userState.isLoggedIn || !userDetails) {
      return;
    }
    try {
      const {
        data: { watchlater },
      } = await callAPI(
        "GET",
        "/api/user/watchlater",
        null,
        userDetails?.encodedToken
      );
      userDispatch({ type: "WATCH_LATER", payload: watchlater });
    } catch (error) {
      toast.error("Problem in retrieving your watch later videos!");
    }
  };

  const addToHistory = async (video) => {
    if (userState.isLoggedIn && !userState.enableHistory) {
      return;
    }
    try {
      const {
        data: { history },
      } = await callAPI(
        "POST",
        "/api/user/history",
        { video: video },
        userDetails?.encodedToken
      );
      userDispatch({ type: "HISTORY", payload: history });
    } catch (error) {
      toast.error("Couldn't add videos to history");
    }
  };
  const addToWatchLater = async (video) => {
    try {
      const {
        data: { watchlater },
      } = await callAPI(
        "POST",
        "/api/user/watchlater",
        { video: video },
        userDetails?.encodedToken
      );
      userDispatch({ type: "WATCH_LATER", payload: watchlater });
      toast.success("Added Video to Watch Later");
    } catch (error) {
      toast.error("Couldn't add videos to watch later");
    }
  };

  const removeVideoFromHistory = async (_id) => {
    try {
      const {
        data: { history },
      } = await callAPI(
        "DELETE",
        `/api/user/history/${_id}`,
        null,
        userDetails?.encodedToken
      );
      userDispatch({ type: "HISTORY", payload: history });
      toast.success("Removed Video from History");
    } catch (error) {
      toast.error("Could not remove video from history.");
    }
  };
  const removeFromWatchLater = async (_id) => {
    try {
      const {
        data: { watchlater },
      } = await callAPI(
        "DELETE",
        `/api/user/watchlater/${_id}`,
        null,
        userDetails?.encodedToken
      );
      userDispatch({ type: "WATCH_LATER", payload: watchlater });
      toast.success("Removed Video from Watch Later");
    } catch (error) {
      toast.error("Could not remove video from watch later.");
    }
  };

  const emptyHistory = async () => {
    if (userState.history.length === 0) {
      toast.warn("There are no videos here to delete");
      return;
    }
    try {
      const {
        data: { history },
      } = await callAPI(
        "DELETE",
        `/api/user/history/all`,
        null,
        userDetails?.encodedToken
      );
      userDispatch({ type: "HISTORY", payload: history });
      toast.success("Cleared History.");
    } catch (error) {
      toast.error("Could not empty your history");
    }
  };

  useEffect(() => {
    getUserHistory();
    getUserWatchLater();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.isLoggedIn]);

  const value = {
    userState,
    userDispatch,
    loginUser,
    signUpUser,
    logoutUser,
    getAllLikedVideos,
    addToLikedVideos,
    removeFromLikedVideos,
    getUserHistory,
    addToHistory,
    removeVideoFromHistory,
    emptyHistory,
    addToWatchLater,
    removeFromWatchLater,
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
