export const userDetails =
  JSON.parse(localStorage.getItem("userToken")) || null;

export const initialUserState = {
  isLoggedIn: userDetails?.encodedToken ? true : false,
  firstName: userDetails?.firstName || null,
  lastName: userDetails?.lastName || null,
  likedVideos: [],
  watchLater: [],
  history: [],
  playlists: [],
  enableHistory: false,
};

export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_USER":
      return {
        isLoggedIn: true,
        firstName: payload.firstName,
        lastName: payload.lastName,
        likes: payload.likes,
        watchlater: payload.watchlater,
        history: payload.history,
        playlists: payload.playlists,
      };
    case "LOGOUT_USER":
      return {
        isLoggedIn: false,
        firstName: null,
        lastName: null,
        likedVideos: [],
        watchLater: [],
        history: [],
        playlists: [],
      };
    case "LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: payload,
      };
    case "HISTORY":
      return { ...state, history: payload };
    case "ENABLE_HISTORY":
      return {
        ...state,
        enableHistory: payload,
      };
    case "WATCH_LATER":
      return { ...state, watchLater: payload };
    default:
      return state;
  }
};
