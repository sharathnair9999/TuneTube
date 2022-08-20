import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { constants } from "../../app-utils";
import { EmptyData } from "../../components";
import { useAuth } from "../../contexts";
import { useDocumentTitle } from "../../custom-hooks";
import "./Playlist.css";
import Playlists from "./Playlists";

const Playlist = () => {
  const { playlistId } = useParams();
  const setDocumentTitle = useDocumentTitle(constants.titles.playlists());
  const {
    getAllPlaylists,
    userState: { playlists },
    handlePlaylistModal,
  } = useAuth();
  useEffect(() => {
    playlists.length === 0 && getAllPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlists]);

  useEffect(() => {
    !playlistId && setDocumentTitle(constants.titles.playlists());
  });

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
