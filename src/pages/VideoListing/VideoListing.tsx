import React, { useEffect } from "react";
import { constants } from "../../app-utils";
import {
  CategoryChip,
  EmptyData,
  SkeletalLoading,
  VideoCard,
} from "../../components";
import { useVideos } from "../../contexts";
import {
  CategoryType,
  VideoType,
} from "../../contexts/Video-Context/VideoContext.types";
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
  const search = searchParams.get("search") || "";
  const setSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ sort: e.target.value, category: category, search });
  };

  useEffect(() => {
    allVideos.length === 0 && getAllVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateSortedVideos = sortVideos(allVideos, sort);
  const displayVideos = categorizedVideos(dateSortedVideos, category);
  const searchVideos = displayVideos.filter((video: VideoType) =>
    search
      ? video.category.toLowerCase().includes(search.toLowerCase()) ||
        video.title.toLowerCase().includes(search.toLowerCase()) ||
        video.description.toLowerCase().includes(search.toLowerCase()) ||
        video.creator.toLowerCase().includes(search.toLowerCase())
      : true
  );

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
          {allCategories?.map((category: CategoryType) => (
            <CategoryChip key={category._id} category={category.categoryName} />
          ))}
        </ul>
      </div>

      <div className="video-listing">
        {allVideosLoading
          ? [...Array(8)].map((_, _id) => <SkeletalLoading key={_id} />)
          : searchVideos?.map((video: VideoType) => (
              <VideoCard key={video._id} video={video} />
            ))}
      </div>
      {searchVideos.length === 0 && <EmptyData msg={"No Videos Here"} />}
    </div>
  );
};

export default VideoListing;
