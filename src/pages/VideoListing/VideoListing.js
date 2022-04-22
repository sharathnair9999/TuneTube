import React, { useEffect } from "react";
import { CategoryChip } from "../../components";
import { useVideos } from "../../contexts";
import "./VideoListing.css";

const VideoListing = () => {
  const {
    videosState: {
      allCategories,
      allVideos,
      filters: { dateSort },
    },
    videosDispatch,
    getAllVideos,
  } = useVideos();

  const setSortBy = (e) => {
    videosDispatch({ type: e.target.value });
  };

  useEffect(() => {
    allVideos.length === 0 && getAllVideos();
  }, []);

  return (
    <div className="video-listing-container">
      <div className="sort-items flex justify-fs items-center gap-1 pl-1 p-sm">
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
    </div>
  );
};

export default VideoListing;
