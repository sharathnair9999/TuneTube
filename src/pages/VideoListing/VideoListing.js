import React from "react";
import "./VideoListing.css";

const VideoListing = () => {
  return (
    <div className="video-listing-container">
      <div className="sort-items flex justify-fs items-center gap-1 pl-1">
        <select name="date-sort" id="date-sort" className="date-sort">
          <option value="">Sort By</option>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
        <ul className="categories-chip-container">
          <li className="">Unboxing</li>
          <li className="">Review</li>
          <li className="">Breakdown</li>
          <li className="">Giveaways</li>
        </ul>
      </div>
    </div>
  );
};

export default VideoListing;
