import React from "react";
import { constants } from "../../app-utils";
import "./EmptyData.css";

const EmptyData = ({ msg, imgUrl = constants.imgUrls.empty_box }) => {
  return (
    <div className="w-100 flex-and-center flex-col">
      <img src={imgUrl} alt="empty-box" />
      <p className="font-xl">{msg}</p>
    </div>
  );
};

export default EmptyData;
