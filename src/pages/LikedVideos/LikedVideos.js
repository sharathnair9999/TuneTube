import React, { useEffect } from "react";
import { HorizontalCard, SkeletalLoading } from "../../components";
import { useAuth } from "../../contexts";
import "./LikedVideos.css";

const LikedVideos = () => {
  const {
    userState: { likedVideos, allVideos },
    getAllLikedVideos,
  } = useAuth();

  useEffect(() => {
    likedVideos.length === 0 && getAllLikedVideos();
    console.log(likedVideos);
  }, []);

  return (
    <div className="flex-col flex justify-center items-fs  gap-1">
      <p className="font-lg">Liked Videos</p>
      {likedVideos.length === 0 ? (
        <div className="like-skeleton-container flex-and-center  flex-col gap-1">
          {[...Array(5)].map((_, _id) => (
            <SkeletalLoading sideCards />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-fs flex-col gap-1 w-100">
          {likedVideos.map((video) => (
            <HorizontalCard video={video} key={video._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedVideos;
