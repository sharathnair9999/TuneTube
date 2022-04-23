import React from "react";

import "./SkeletalLoading.css";

const SkeletalLoading = () => {
  return (
      <div className="listing-skeleton">
        <div className="image skeleton"></div>
        <div className="contents flex justify-space-btw items-center gap-sm">
          <div className="avatar skeleton"></div>
          <div className="text-section flex-and-center flex-col gap-sm">
            <div className="text skeleton"></div>
            <div className="text skeleton"></div>
          </div>
        </div>
      </div>
  );
};

export default SkeletalLoading;
