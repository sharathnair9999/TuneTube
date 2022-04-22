export const initialVideosState = {
  allVideos: [],
  currVideo: {},
  allCategories: [],
  filters: {
    dateSort: "LATEST",
    filterByCategory: "",
    filterByCreator: "",
  },
};

export const videosReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_VIDEOS":
      return { ...state, allVideos: payload };
    case "GET_ALL_CATEGORIES":
      return { ...state, allCategories: payload };
    case "FILTER_BY_CATEGORY":
      if (
        state.filters.filterByCategory === payload &&
        state.filters.filterByCategory === "All"
      ) {
        return {
          ...state,
          filters: { ...state.filters, filterByCategory: "" },
        };
      }
      return {
        ...state,
        filters: { ...state.filters, filterByCategory: payload },
      };

    case "LATEST":
      return { ...state, filters: { ...state.filters, dateSort: "LATEST" } };
    case "OLDEST":
      return { ...state, filters: { ...state.filters, dateSort: "OLDEST" } };
    case "CURRENT_VIDEO":
      return { ...state, currVideo: payload };
    default:
      return initialVideosState;
  }
};
