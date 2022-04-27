export const initialVideosState = {
  allVideos: [],
  allVideosLoading: false,
  currVideo: {},
  isVideoLoading: false,
  allCategories: [],
  filters: {
    dateSort: "LATEST",
    filterByCreator: "",
  },
};

export const videosReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOADING_CURR_VIDEO":
      return { ...state, isVideoLoading: payload };
    case "GET_VIDEO":
      return { ...state, currVideo: payload };
    case "GET_ALL_VIDEOS":
      return { ...state, allVideos: payload };
    case "ALL_VIDEOS_LOADING":
      return { ...state, allVideosLoading: payload };
    case "GET_ALL_CATEGORIES":
      return { ...state, allCategories: payload };
    case "CURRENT_VIDEO":
      return { ...state, currVideo: payload };
    default:
      return initialVideosState;
  }
};

export const sortVideos = (videos, sortBy = "LATEST") => {
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

export const categorizedVideos = (videos, selectedCategory = "All") => {
  if (selectedCategory === "All") return videos;
  let videosByCategory = videos.filter(
    ({ category }) => category === selectedCategory
  );
  return videosByCategory;
};

export const getThumbnail = (_id) =>
  `http://i3.ytimg.com/vi/${_id}/maxresdefault.jpg`;
