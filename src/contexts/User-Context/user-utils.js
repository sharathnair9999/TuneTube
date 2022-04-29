export const savedDetails = () =>
  JSON.parse(localStorage.getItem("userToken")) || null;

export const initialUserState = {
  isLoggedIn: savedDetails()?.encodedToken ? true : false,
  firstName: savedDetails()?.firstName || null,
  lastName: savedDetails()?.lastName || null,
  likedVideos: [],
  watchLater: [],
  history: [],
  playlists: [],
  alert: null,
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
      return initialUserState;
    case "LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: payload,
      };
    default:
      return state;
  }
};
