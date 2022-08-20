import {
  VideoAction,
  VideoActionsTypes,
  VideoStateType,
  VideoType,
} from "./VideoContext.types";

export const initialVideosState: VideoStateType = {
  allVideos: [],
  allVideosLoading: false,
  currVideo: {
    _id: "",
    category: "",
    creator: "",
    creatorImg: "",
    description: "",
    duration: "",
    title: "",
    uploadedOn: "",
  },
  isVideoLoading: false,
  allCategories: [],
  filters: {
    dateSort: "LATEST",
    filterByCreator: "",
  },
};

export const videosReducer = (state: VideoStateType, action: VideoAction) => {
  const { type, payload } = action;
  switch (type) {
    case VideoActionsTypes.LOADING_CURR_VIDEO:
      return { ...state, isVideoLoading: payload };
    case VideoActionsTypes.GET_VIDEO:
      return { ...state, currVideo: payload };
    case VideoActionsTypes.GET_ALL_VIDEOS:
      return { ...state, allVideos: payload };
    case VideoActionsTypes.ALL_VIDEOS_LOADING:
      return { ...state, allVideosLoading: payload };
    case VideoActionsTypes.GET_ALL_CATEGORIES:
      return { ...state, allCategories: payload };
    default:
      return initialVideosState;
  }
};

export const sortVideos = (videos: VideoType[], sortBy = "LATEST") => {
  return sortBy !== null && sortBy === "LATEST"
    ? videos.sort((video1, video2) => {
        let video1Date = Date.parse(video1.uploadedOn.trim());
        let video2Date = Date.parse(video2.uploadedOn.trim());
        return video2Date - video1Date;
      })
    : sortBy === "OLDEST"
    ? videos.sort((video1, video2) => {
        let video1Date = Date.parse(video1.uploadedOn.trim());
        let video2Date = Date.parse(video2.uploadedOn.trim());
        return video1Date - video2Date;
      })
    : videos;
};

export const categorizedVideos = (
  videos: VideoType[],
  selectedCategory = "All"
) => {
  if (selectedCategory === "All") return videos;
  let videosByCategory = videos.filter(
    ({ category }) => category === selectedCategory
  );
  return videosByCategory;
};

export const getThumbnail = (_id: string) =>
  `http://i3.ytimg.com/vi/${_id}/maxresdefault.jpg`;
