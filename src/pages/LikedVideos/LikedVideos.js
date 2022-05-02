import React, { useEffect } from "react";
import { constants } from "../../app-utils";
import { EmptyData, HorizontalCard } from "../../components";
import { useAuth } from "../../contexts";
import { useDocumentTitle } from "../../custom-hooks";
import "./LikedVideos.css";

const LikedVideos = () => {
  const {
    userState: { likedVideos },
    getAllLikedVideos,
  } = useAuth();

  useEffect(() => {
    likedVideos?.length === 0 && getAllLikedVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { titles } = constants;
  useDocumentTitle(titles.liked());

  return (
    <div className="flex-col flex justify-fs items-fs  gap-1 p-sm">
      <p className=" title">{`Liked Videos ${
        likedVideos?.length > 0 ? `- ${likedVideos?.length}` : ""
      }`}</p>
      {likedVideos?.length === 0 ? (
        <EmptyData
          msg={"You didn't like any videos from us!"}
          url={"/explore"}
        />
      ) : (
        <div className="flex justify-center items-center flex-col gap-sm w-100">
          {likedVideos?.map((video, sNo) => (
            <HorizontalCard video={video} key={video._id} sNo={sNo} likeCard />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedVideos;
