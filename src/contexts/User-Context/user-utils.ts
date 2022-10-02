import {
  ModalStateType,
  UserActions,
  UserStateType,
} from "./UserContext.types";

type UserDetailsType = {
  encodedToken: string;
  firstName: string;
  lastName: string;
};
export const userDetails: UserDetailsType = JSON.parse(
  localStorage.getItem("userToken") as string
) || { encodedToken: "", firstName: "", lastName: "" };

export const initialModalState: ModalStateType = {
  openModal: false,
  video: {},
  fromPlaylist: false,
};
export const initialUserState: UserStateType = {
  isLoggedIn: userDetails?.encodedToken ? true : false,
  firstName: userDetails?.firstName || "",
  lastName: userDetails?.lastName || "",
  likedVideos: [],
  watchlater: [],
  history: [],
  playlists: [],
  playlist: {
    _id: "",
    title: "",
    description: "",
    videos: [],
  },
  playlistModalState: initialModalState,
};

export const userReducer = (
  state: UserStateType,
  action: { type: UserActions; payload?: any }
): UserStateType => {
  const { type, payload } = action;
  switch (type) {
    case UserActions.LOGIN_USER:
      return {
        isLoggedIn: true,
        firstName: payload.firstName,
        lastName: payload.lastName,
        likedVideos: payload.likedVideos,
        watchlater: payload.watchlater,
        history: payload.history,
        playlists: payload.playlists,
        playlist: state.playlist,
        playlistModalState: initialModalState,
      };
    case UserActions.LOGOUT_USER:
      return {
        isLoggedIn: false,
        firstName: "",
        lastName: "",
        likedVideos: [],
        playlist: state.playlist,
        watchlater: [],
        history: [],
        playlists: [],
        playlistModalState: initialModalState,
      };
    case UserActions.LIKED_VIDEOS:
      return {
        ...state,
        likedVideos: payload,
      };
    case UserActions.HISTORY:
      return { ...state, history: payload };
    case UserActions.WATCH_LATER:
      return { ...state, watchlater: payload };
    case UserActions.ALL_PLAYLISTS:
      return { ...state, playlists: payload };
    case UserActions.SINGLE_PLAYLIST:
      return { ...state, playlist: payload };
    case UserActions.ADD_TO_PLAYLIST:
      const playlist = payload;
      const whichPlaylist: any = state.playlists.find(
        (item: any) => item._id === playlist._id
      );
      const temp = state.playlists.map((item: any) =>
        item._id === whichPlaylist._id ? playlist : item
      );
      return { ...state, playlists: temp };
    case UserActions.DELETE_FROM_PLAYLIST:
      const newPlaylist = payload;
      const findPlaylist: any = state.playlists.find(
        (item: any) => item._id === newPlaylist._id
      );
      const newALlPlaylist = state.playlists.map((item: any) =>
        item._id === findPlaylist._id ? newPlaylist : item
      );
      return { ...state, playlists: newALlPlaylist };

    case UserActions.PLAYLIST_MODAL:
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
