import { createContext, useReducer, useContext } from "react";
import { initialVideosState, videosReducer } from "./video-utils";

const VideosContext = createContext(initialVideosState);

const VideosProvider = ({ children }) => {
  const [videosState, videosDispatch] = useReducer(
    videosReducer,
    initialVideosState
  );

  const value = { videosState, videosDispatch };

  return (
    <VideosContext.Provider value={value}>{children}</VideosContext.Provider>
  );
};


const useVideos = () => useContext(VideosContext)

export {useVideos, VideosProvider}
