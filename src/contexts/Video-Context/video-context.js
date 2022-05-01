import { createContext, useReducer, useContext, useEffect } from "react";
import { callAPI } from "../../app-utils";
import {
  initialVideosState,
  videosReducer,
  sortVideos,
  categorizedVideos,
  getThumbnail,
} from "./video-utils";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const VideosContext = createContext(initialVideosState);

const VideosProvider = ({ children }) => {
  const [videosState, videosDispatch] = useReducer(
    videosReducer,
    initialVideosState
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const getAllVideos = async () => {
    try {
      videosDispatch({ type: "ALL_VIDEOS_LOADING", payload: true });
      const {
        data: { videos },
      } = await callAPI("GET", "/api/videos");
      videosDispatch({ type: "ALL_VIDEOS_LOADING", payload: false });
      videosDispatch({ type: "GET_ALL_VIDEOS", payload: videos });
    } catch (error) {
      videosDispatch({ type: "ALL_VIDEOS_LOADING", payload: false });
      toast.error("Could not fetch the videos");
    }
  };

  const getVideo = async (_id) => {
    try {
      videosDispatch({ type: "LOADING_CURR_VIDEO", payload: true });
      const {
        data: { video },
      } = await callAPI("GET", `/api/video/${_id}`);
      videosDispatch({ type: "GET_VIDEO", payload: video });
      videosDispatch({ type: "LOADING_CURR_VIDEO", payload: false });
    } catch (error) {
      videosDispatch({ type: "LOADING_CURR_VIDEO", payload: false });
      toast.error("Could not fetch the video");
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

  const value = {
    videosState,
    videosDispatch,
    getAllCategories,
    getAllVideos,
    sortVideos,
    categorizedVideos,
    getVideo,
    getThumbnail,
    searchParams,
    setSearchParams,
  };

  return (
    <VideosContext.Provider value={value}>{children}</VideosContext.Provider>
  );
};

const useVideos = () => useContext(VideosContext);

export { useVideos, VideosProvider };
