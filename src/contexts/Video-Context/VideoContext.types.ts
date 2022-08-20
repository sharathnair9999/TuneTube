import { URLSearchParamsInit } from "react-router-dom";

export enum VideoActionsTypes {
  LOADING_CURR_VIDEO = "LOADING_CURR_VIDEO",
  GET_VIDEO = "GET_VIDEO",
  GET_ALL_VIDEOS = "GET_ALL_VIDEOS",
  ALL_VIDEOS_LOADING = "ALL_VIDEOS_LOADING",
  GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES",
}
export type VideoType = {
  _id: string;
  category: string;
  creator: string;
  creatorImg: string;
  description: string;
  duration: string;
  title: string;
  uploadedOn: string;
};

export type CategoryType = {
  _id: string;
  categoryName: string;
  description: string;
  thumbnail: string;
};

export type VideoFiltersType = {
  dateSort: "LATEST" | "OLDEST";
  filterByCreator: string;
};

export type VideoAction = {
  type: VideoActionsTypes;
  payload: any;
};

export type VideoStateType = {
  allVideos: VideoType[];
  allVideosLoading: boolean;
  currVideo: VideoType;
  isVideoLoading: boolean;
  allCategories: VideoType[];
  filters: VideoFiltersType;
};

export type VideoContextValues = {
  videosState: VideoStateType;
  videosDispatch: React.Dispatch<VideoAction>;
  getAllCategories: () => Promise<void>;
  getAllVideos: () => Promise<void>;
  sortVideos: (videos: VideoType[], sortBy?: string) => VideoType[];
  categorizedVideos: (
    videos: VideoType[],
    selectedCategory?: string
  ) => VideoType[];
  getVideo: (_id: string) => Promise<void>;
  getThumbnail: (_id: string) => string;
  searchParams: URLSearchParams;
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?:
      | {
          replace?: boolean | undefined;
          state?: any;
        }
      | undefined
  ) => void;
};
