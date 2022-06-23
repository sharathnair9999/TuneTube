export const userDetails =
  JSON.parse(localStorage.getItem("userToken")) || null;

export const initialModalState = {
  openModal: false,
  video: {},
  fromPlaylist: false,
};

export const initialUserState = {
  isLoggedIn: userDetails?.encodedToken ? true : false,
  firstName: userDetails?.firstName || null,
  lastName: userDetails?.lastName || null,
  likedVideos: [],
  watchlater: [],
  history: [],
  playlists: [],
  playlist: {},
  playlistModalState: initialModalState,
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
        playlistModalState: initialModalState,
      };
    case "LOGOUT_USER":
      return {
        isLoggedIn: false,
        firstName: null,
        lastName: null,
        likedVideos: [],
        watchlater: [],
        history: [],
        playlists: [],
        playlistModalState: initialModalState,
      };
    case "LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: payload,
      };
    case "HISTORY":
      return { ...state, history: payload };
    case "WATCH_LATER":
      return { ...state, watchlater: payload };
    case "ALL_PLAYLISTS":
      return { ...state, playlists: payload };
    case "SINGLE_PLAYLIST":
      return { ...state, playlist: payload };
    case "ADD_TO_PLAYLIST":
      const playlist = payload;
      const whichPlaylist = state.playlists.find(
        (item) => item._id === playlist._id
      );
      const temp = state.playlists.map((item) =>
        item._id === whichPlaylist._id ? playlist : item
      );
      return { ...state, playlists: temp };
    case "DELETE_FROM_PLAYLIST":
      const newPlaylist = payload;
      const findPlaylist = state.playlists.find(
        (item) => item._id === newPlaylist._id
      );
      const newALlPlaylist = state.playlists.map((item) =>
        item._id === findPlaylist._id ? newPlaylist : item
      );
      return { ...state, playlists: newALlPlaylist };

    case "PLAYLIST_MODAL":
      return {
        ...state,
        playlistModalState: {
          openModal: payload.openModal,
          video: payload.video,
          fromPlaylist: payload.fromPlaylist,
        },
      };
    default:
      return state;
  }
};
