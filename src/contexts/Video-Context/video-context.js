import { createContext, useReducer, useContext, useEffect } from "react";
import { callAPI } from "../../app-utils";
import { initialVideosState, videosReducer } from "./video-utils";

const VideosContext = createContext(initialVideosState);

const VideosProvider = ({ children }) => {
  const [videosState, videosDispatch] = useReducer(
    videosReducer,
    initialVideosState
  );

  const getAllCategories = async () => {
    try {
      const {
        data: { categories },
      } = await callAPI("GET", "/api/categories");
      console.log(categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const value = { videosState, videosDispatch };

  return (
    <VideosContext.Provider value={value}>{children}</VideosContext.Provider>
  );
};

const useVideos = () => useContext(VideosContext);

export { useVideos, VideosProvider };
