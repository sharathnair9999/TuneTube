import { VideoType } from "../Video-Context/VideoContext.types";

export type LikedVideoType = {
  _id: string;
  category: string;
  creator: string;
  creatorImg: string;
  description: string;
  duration: string;
  title: string;
  uploadedOn: string;
};

export type WatchLaterType = {};
export type HistoryType = {};
export type PlaylistType = {
  _id: string;
  description: string;
  title: string;
  videos: VideoType[];
};
export type ModalStateType = {
  openModal: boolean;
  video: any;
  fromPlaylist: boolean;
};
export type UserActionType = {
  type: UserActions;
  payload?:
    | VideoType[]
    | UserStateType
    | {
        firstName: string;
        lastName: string;
        likedVideos: VideoType[];
        watchlater: VideoType[];
        history: VideoType[];
        playlists: PlaylistType[];
      }
    | {
        openModal: boolean;
        fromPlaylist: boolean;
        video: VideoType;
      };
};
export enum UserActions {
  LOGIN_USER = "LOGIN_USER",
  LOGOUT_USER = "LOGOUT_USER",
  LIKED_VIDEOS = "LIKED_VIDEOS",
  HISTORY = "HISTORY",
  WATCH_LATER = "WATCH_LATER",
  ALL_PLAYLISTS = "ALL_PLAYLISTS",
  SINGLE_PLAYLIST = "SINGLE_PLAYLIST",
  ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST",
  DELETE_FROM_PLAYLIST = "DELETE_FROM_PLAYLIST",
  PLAYLIST_MODAL = "PLAYLIST_MODAL",
}

export type UserStateType = {
  isLoggedIn: boolean;
  firstName: string;
  lastName: string;
  likedVideos: VideoType[];
  watchlater: VideoType[];
  history: HistoryType[];
  playlists: PlaylistType[];
  playlist: PlaylistType;
  playlistModalState: ModalStateType;
};
