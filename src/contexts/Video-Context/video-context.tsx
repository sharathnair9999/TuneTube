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
import { useNavigate, useSearchParams } from "react-router-dom";
import { VideoActionsTypes, VideoStateType } from "./VideoContext.types";

const VideosContext: React.Context<VideoStateType> =
  createContext(initialVideosState);

const VideosProvider = ({ children }: { children: React.ReactNode }) => {
  const [videosState, videosDispatch] = useReducer(
    videosReducer,
    initialVideosState
  );

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const getAllVideos = async () => {
    try {
      videosDispatch({
        type: VideoActionsTypes.ALL_VIDEOS_LOADING,
        payload: true,
      });
      const {
        data: { videos },
      } = await callAPI("GET", "/api/videos");
      videosDispatch({
        type: VideoActionsTypes.ALL_VIDEOS_LOADING,
        payload: false,
      });
      videosDispatch({
        type: VideoActionsTypes.GET_ALL_VIDEOS,
        payload: videos,
      });
    } catch (error) {
      videosDispatch({
        type: VideoActionsTypes.ALL_VIDEOS_LOADING,
        payload: false,
      });
      toast.error("Could not fetch the videos");
    }
  };

  const getVideo = async (_id: string) => {
    try {
      videosDispatch({
        type: VideoActionsTypes.LOADING_CURR_VIDEO,
        payload: true,
      });
      const {
        data: { video },
      } = await callAPI("GET", `/api/video/${_id}`);
      videosDispatch({ type: VideoActionsTypes.GET_VIDEO, payload: video });
      videosDispatch({
        type: VideoActionsTypes.LOADING_CURR_VIDEO,
        payload: false,
      });
    } catch (error) {
      navigate("/invalid-page");
      videosDispatch({
        type: VideoActionsTypes.LOADING_CURR_VIDEO,
        payload: false,
      });
      toast.error("Could not fetch the video");
    }
  };

  const getAllCategories = async () => {
    try {
      const {
        data: { categories },
      } = await callAPI("GET", "/api/categories");
      videosDispatch({
        type: VideoActionsTypes.GET_ALL_CATEGORIES,
        payload: categories,
      });
    } catch (error) {
      toast.error("Could not fetch categories");
    }
  };
  useEffect(() => {
    videosState.allCategories.length === 0 && getAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: any = {
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

const useVideos = (): any => useContext(VideosContext);

export { useVideos, VideosProvider };
