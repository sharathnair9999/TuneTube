import React, { useEffect } from "react";
import { constants } from "../../app-utils";
import {
  CategoryChip,
  EmptyData,
  SkeletalLoading,
  VideoCard,
} from "../../components";
import { useVideos } from "../../contexts";
import { useDocumentTitle } from "../../custom-hooks";
import "./VideoListing.css";

const VideoListing = () => {
  const { titles } = constants;
  useDocumentTitle(titles.explore());
  const {
    videosState: { allCategories, allVideos, allVideosLoading },
    getAllVideos,
    sortVideos,
    categorizedVideos,
    searchParams,
    setSearchParams,
  } = useVideos();

  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "LATEST";
  console.log(sort);
  const setSortBy = (e) => {
    setSearchParams({ sort: e.target.value, category: category });
  };

  useEffect(() => {
    allVideos.length === 0 && getAllVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateSortedVideos = sortVideos(allVideos, sort);
  const displayVideos = categorizedVideos(dateSortedVideos, category);

  return (
    <div className="video-listing-container">
      <div className="sort-items flex justify-fs items-center wrap p-sm">
        <select
          name="date-sort"
          id="date-sort"
          className="date-sort"
          value={sort}
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
        {allVideosLoading
          ? [...Array(8)].map((_, _id) => <SkeletalLoading key={_id} />)
          : displayVideos?.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
      </div>
      {displayVideos.length === 0 && <EmptyData msg={"No Videos Here"} />}
    </div>
  );
};

export default VideoListing;
