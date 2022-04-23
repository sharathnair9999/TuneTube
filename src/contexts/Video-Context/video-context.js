import { createContext, useReducer, useContext, useEffect } from "react";
import { callAPI } from "../../app-utils";
import {
  initialVideosState,
  videosReducer,
  sortVideos,
  categorizedVideos,
} from "./video-utils";
import { toast } from "react-toastify";

const VideosContext = createContext(initialVideosState);

const VideosProvider = ({ children }) => {
  const [videosState, videosDispatch] = useReducer(
    videosReducer,
    initialVideosState
  );

  const getAllVideos = async () => {
    try {
      const {
        data: { videos },
      } = await callAPI("GET", "/api/videos");
      videosDispatch({ type: "GET_ALL_VIDEOS", payload: videos });
    } catch (error) {
      toast.error("Could not fetch the videos");
    }
  };

  const getAllCategories = async () => {
    try {
      const {
        data: { categories },
      } = await callAPI("GET", "/api/categories");
      videosDispatch({ type: "GET_ALL_CATEGORIES", payload: categories });
    } catch (error) {
      toast.error("Could not fetch categories");
    }
  };
  useEffect(() => {
    videosState.allCategories.length === 0 && getAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = { videosState, videosDispatch, getAllCategories, getAllVideos, sortVideos, categorizedVideos };

  return (
    <VideosContext.Provider value={value}>{children}</VideosContext.Provider>
  );
};

const useVideos = () => useContext(VideosContext);

export { useVideos, VideosProvider };
