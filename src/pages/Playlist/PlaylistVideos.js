import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { constants } from "../../app-utils";
import { EmptyData, HorizontalCard } from "../../components";
import { useAuth } from "../../contexts";
import { useDocumentTitle } from "../../custom-hooks";

const PlaylistVideos = () => {
  const {
    userState: { playlists },
  } = useAuth();
  const { playlistId } = useParams();
  const playlist = playlists.find((playlist) => playlist._id === playlistId);

  const [, setDocumentTitle] = useDocumentTitle(
    constants.titles.video(playlist?.title)
  );

  useEffect(() => {
    setDocumentTitle(constants.titles.video(playlist?.title))
  }, [playlistId])
  

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
