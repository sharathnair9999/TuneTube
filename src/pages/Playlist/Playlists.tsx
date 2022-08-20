import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import { AiFillDelete } from "react-icons/ai";
import ReactTooltip from "react-tooltip";
import { PlaylistType } from "../../contexts/User-Context/UserContext.types";

const Playlists = ({ playlists }: { playlists: PlaylistType[] }) => {
  const navigate = useNavigate();
  const { deletePlaylist } = useAuth();
  return (
    <div className="playlists-list flex justify-fs items-fs gap-1 flex-col">
      <ReactTooltip place="bottom" effect="solid" />
      {playlists.map((playlist) => (
        <Link
          to={`./${playlist._id}`}
          key={playlist._id}
          className="playlist-card flex justify-fs items-fs gap-sm"
        >
          <section className="flex justify-fs items-fs gap-sm flex-col h-100 w-100">
            <p className="playlist-title">{`Title: ${playlist.title}`}</p>
            {playlist.description && (
              <p className="playlist-description">{`Details: ${playlist.description}`}</p>
            )}
            <small className="playlist-count">{`Videos : ${playlist?.videos?.length}`}</small>
          </section>
          <button
            data-tip="Delete Playlist"
            onClick={() => deletePlaylist(playlist._id, true, navigate)}
            className="btn-transparent ml-auto my-auto"
          >
            <AiFillDelete color="#dc2626" size={"1.2rem"} />
          </button>
        </Link>
      ))}
    </div>
  );
};

export default Playlists;
