import React from "react";

import "./SkeletalLoading.css";

const SkeletalLoading = ({ sideCards }) => {
  return (
    <div className={`listing-skeleton  `}>
      {sideCards ? (
        <div className="card-skeleton w-100 flex items-fs justify-center">
          <div className="image skeleton"></div>
          <div className="text-section flex-and-center flex-col gap-sm">
            <div className="text skeleton"></div>
            <div className="text skeleton"></div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className={`${sideCards ? "side-image" : "image"} skeleton`}
          ></div>
          <div className="contents flex-and-center gap-sm">
            <div className="avatar skeleton"></div>
            <div className="text-section flex-and-center flex-col gap-sm">
              <div className="text skeleton"></div>
              <div className="text skeleton"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkeletalLoading;
