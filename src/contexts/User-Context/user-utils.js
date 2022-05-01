const savedDetails = () =>
  JSON.parse(localStorage.getItem("userToken")) || null;

export const userDetails = savedDetails();

export const initialUserState = {
  isLoggedIn: userDetails?.encodedToken ? true : false,
  firstName: userDetails?.firstName || null,
  lastName: userDetails?.lastName || null,
  likedVideos: [],
  watchLater: [],
  history: [],
  playlists: [],
};

export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_USER":
      return {
        ...state,
        isLoggedIn: true,
        firstName: payload.firstName,
        lastName: payload.lastName,
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
    default:
      return state;
  }
};
