import "./WatchLater.css";

import React from "react";
import { useAuth } from "../../contexts";
import { EmptyData, HorizontalCard } from "../../components";
import { constants } from "../../app-utils";
import { useDocumentTitle } from "../../custom-hooks";

const WatchLater = () => {
  const {
    userState: { watchLater },
  } = useAuth();

  const { titles } = constants;
  useDocumentTitle(titles.watchlater());

  return (
    <div className="flex-col flex justify-fs items-fs gap-1 p-sm">
      <p className=" title">{`Watch Later ${
        watchLater.length > 0 ? `- ${watchLater.length}` : ""
      }`}</p>
      {watchLater.length === 0 ? (
        <EmptyData
          msg={
            "You are pretty good at watching things. Still you can add 'em here to watch later."
          }
          url={"/explore"}
        />
      ) : (
        <div className="flex justify-center items-center flex-col gap-sm w-100">
          {watchLater.map((video, sNo) => (
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
