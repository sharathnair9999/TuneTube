import React, { useEffect } from "react";
import {
  CategoryChip,
  EmptyData,
  SkeletalLoading,
  VideoCard,
} from "../../components";
import { useVideos } from "../../contexts";
import "./VideoListing.css";

const VideoListing = () => {
  const {
    videosState: {
      allCategories,
      allVideos,
      allVideosLoading,
      filters: { dateSort, filterByCategory },
    },
    videosDispatch,
    getAllVideos,
    sortVideos,
    categorizedVideos,
  } = useVideos();

  const setSortBy = (e) => {
    videosDispatch({ type: e.target.value });
  };

  useEffect(() => {
    allVideos.length === 0 && getAllVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateSortedVideos = sortVideos(allVideos, dateSort);
  const displayVideos = categorizedVideos(dateSortedVideos, filterByCategory);

  return (
    <div className="video-listing-container">
      <div className="sort-items flex justify-fs items-center wrap p-sm">
        <select
          name="date-sort"
          id="date-sort"
          className="date-sort"
          value={dateSort}
          onChange={setSortBy}
        >
          <option value="LATEST">Latest</option>
          <option value="OLDEST">Oldest</option>
        </select>
        <ul className="categories-chip-container">
          <CategoryChip category={"All"} />
          {allCategories?.map((category) => (
            <CategoryChip key={category._id} category={category.categoryName} />
          ))}
        </ul>
      </div>
      <div className="video-listing">
        {allVideosLoading ? (
          [...Array(8)].map((_, _id) => <SkeletalLoading />)
        ) : displayVideos.length > 0 ? (
          displayVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))
        ) : (
          <EmptyData msg={""} imgUrl={""} />
        )}
      </div>
    </div>
  );
};

export default VideoListing;
