import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { EmptyData } from "../../components";
import { useAuth } from "../../contexts";
import "./Playlist.css";
import Playlists from "./Playlists";

const Playlist = () => {
  const {
    getAllPlaylists,
    userState: { playlists },
    handlePlaylistModal,
  } = useAuth();
  useEffect(() => {
    playlists.length === 0 && getAllPlaylists();
  }, [playlists]);

  return (
    <div>
      <section className="add-playlist-btn">
        <button
          className=" btn-primary btn"
          onClick={() => handlePlaylistModal(true, {}, true)}
        >
          Add Playlist
        </button>
      </section>
      {playlists.length > 0 ? (
        <div className="list-and-videos-container flex justify-center items-fs gap-1">
          <Playlists playlists={playlists} />
          <Outlet />
        </div>
      ) : (
        <EmptyData msg={"No Playlists were created by you"} url={"/explore"} />
      )}
    </div>
  );
};

export default Playlist;
