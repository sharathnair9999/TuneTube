import React from "react";
import { constants } from "../../app-utils";

const PlaylistLanding = () => {
  return (
    <div className="flex-grow-1 flex-and-center">
      <section className=" flex-grow-1 playlist-landing flex-and-center w-100">
        <img
          src={constants.imgUrls.playlist}
          alt="playlist"
          className="responsive-img"
        />
      </section>
    </div>
  );
};

export default PlaylistLanding;
