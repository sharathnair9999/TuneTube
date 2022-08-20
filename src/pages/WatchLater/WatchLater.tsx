import "./WatchLater.css";

import React, { useEffect } from "react";
import { useAuth } from "../../contexts";
import { EmptyData, HorizontalCard } from "../../components";
import { constants } from "../../app-utils";
import { useDocumentTitle } from "../../custom-hooks";
import { VideoType } from "../../contexts/Video-Context/VideoContext.types";

const WatchLater = () => {
  const {
    userState: { watchlater },
    getUserWatchLater,
  } = useAuth();

  const { titles } = constants;
  useDocumentTitle(titles.watchlater());

  useEffect(() => {
    watchlater?.length === 0 && getUserWatchLater();
  }, []);

  return (
    <div className="flex-col flex justify-fs items-fs gap-1 p-sm">
      <p className=" title">{`Watch Later ${
        watchlater?.length > 0 ? `- ${watchlater?.length}` : ""
      }`}</p>
      {watchlater?.length === 0 ? (
        <EmptyData
          msg={
            "You are pretty good at watching things. Still you can add 'em here to watch later."
          }
          url={"/explore"}
        />
      ) : (
        <div className="flex justify-center items-center flex-col gap-sm w-100">
          {watchlater?.map((video: VideoType, sNo: number) => (
            <HorizontalCard
              video={video}
              key={video._id}
              sNo={sNo}
              watchLaterCard
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchLater;
