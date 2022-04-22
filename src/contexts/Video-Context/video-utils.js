export const initialVideosState = {
  allVideos: [],
  currVideo : {},
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
    case "LATEST":
      return { ...state, filters: { ...state.filters, dateSort: "LATEST" } };
    case "OLDEST":
      return { ...state, filters: { ...state.filters, dateSort: "OLDEST" } };
    case "CURRENT_VIDEO":
      return {...state, currVideo : payload}
    default:
      return initialVideosState;
  }
};
