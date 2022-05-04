import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { EmptyData, HorizontalCard } from "../../components";
import { useAuth } from "../../contexts";

const PlaylistVideos = () => {
  const { pathname } = useLocation();
  const {
    deleteVideoFromPlaylist,
    userState: { playlists, playlist, isLoggedIn },
    userDispatch,
    getPlaylist,
  } = useAuth();
  const { playlistId } = useParams();

  const findPlaylist = (id) => {
    const playlistExists = playlists.some((playlist) => playlist._id === id);
    if (playlistExists) {
      const existingPlaylist = playlists.find(
        (playlist) => playlist._id === id
      );
      userDispatch({ type: "SINGLE_PLAYLIST", payload: existingPlaylist });
    } else getPlaylist(id);
  };

  useEffect(() => {
    findPlaylist(playlistId);
  }, [pathname]);

  console.log(playlist);
  console.log(playlists);

  return (
    <div className="playlist-videos-container mt-1">
      {playlist?.videos?.length !== 0 ? (
        playlist?.videos?.map((video, id) => (
          <HorizontalCard
            video={video}
            sNo={id}
            playlistCard
            playlistId={playlistId}
          />
        ))
      ) : (
        <div className="flex-and-center w-100 h-100 flex-grow-1">
          <EmptyData
            msg={"No Videos Added in this playlist"}
            url={"/explore"}
          />
        </div>
      )}
    </div>
  );
};

export default PlaylistVideos;
