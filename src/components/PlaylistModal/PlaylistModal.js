import React, { useState } from "react";
import { useAuth } from "../../contexts";
import "./PlaylistModal.css";
import { MdClose } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { useLocation } from "react-router-dom";

const PlaylistModal = () => {
  const { pathname } = useLocation();
  const {
    createPlaylist,
    handlePlaylistModal,
    deletePlaylist,
    addVideoToPlaylist,
    deleteVideoFromPlaylist,
    userState: {
      playlistModalState: { openModal, video, fromPlaylist },
      playlists,
    },
  } = useAuth();
  const initialPlaylistInfo = {
    title: "",
    description: "",
  };
  const [showInput, setShowInput] = useState(fromPlaylist);

  const [playlistInfo, setPlaylistInfo] = useState(initialPlaylistInfo);
  const handleChange = (e) => {
    setPlaylistInfo((details) => {
      return { ...details, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPlaylist(playlistInfo.title, playlistInfo.description);
    setPlaylistInfo(initialPlaylistInfo);
    setShowInput(!showInput);
    pathname.includes("/playlist") && handlePlaylistModal(false, {}, true);
  };

  const isInAPlaylist = (playlist) => {
    return playlist.videos.find((thisVideo) => thisVideo._id === video._id);
  };

  const handlePlaylist = (playlist) => {
    if (isInAPlaylist(playlist)) {
      deleteVideoFromPlaylist(playlist._id, video._id);
    } else addVideoToPlaylist(playlist._id, video);
  };

  return (
    <div
      onClick={() => {
        handlePlaylistModal(false, {}, false);
      }}
      className={`${openModal ? "show-modal" : "hide-modal"} modal-overlay`}
    >
      <div
        className="playlist-modal flex-and-center flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-modal-btn btn-transparent"
          onClick={() => handlePlaylistModal(false, {}, false)}
        >
          <MdClose color="white" size={"2rem"} />
        </button>
        {!fromPlaylist &&
          playlists?.map((playlist) => (
            <section
              key={playlist._id}
              className="each-playlist font-md-1 flex items-center justify-fs gap-sm w-100"
            >
              <input
                id="playlist-checker"
                type="checkbox"
                onChange={() => handlePlaylist(playlist)}
                checked={isInAPlaylist(playlist)}
              />

              <label htmlFor="playlist-checker">{playlist.title}</label>
              <button
                onClick={() => deletePlaylist(playlist._id)}
                className="ml-auto btn-transparent"
              >
                <AiFillDelete color="#dc2626" size={"1.2rem"} />
              </button>
            </section>
          ))}
        {showInput ? (
          <form
            onSubmit={handleSubmit}
            className="flex justify-fs items-fs flex-col gap-sm w-100"
          >
            <input
              type="text"
              name="title"
              value={playlistInfo.title}
              onChange={handleChange}
              placeholder="Name"
              required
              autoFocus
              className="modal-input w-100"
            />
            <textarea
              placeholder="Description..."
              className="modal-description w-100"
              name="description"
              cols="30"
              rows="10"
              value={playlistInfo.description}
              onChange={handleChange}
              description="Description"
            ></textarea>
            <section className="flex justify-fe items-center gap-sm w-100">
              <button className="btn-primary btn" type="submit">
                Create
              </button>
              <button
                className="btn-danger btn"
                onClick={() => setShowInput(!showInput)}
              >
                Cancel
              </button>
            </section>
          </form>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => setShowInput(!showInput)}
          >
            {showInput ? (
              "Cancel"
            ) : (
              <span className="flex-and-center gap-sm">
                <BiAddToQueue /> <span>New</span>
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default PlaylistModal;
