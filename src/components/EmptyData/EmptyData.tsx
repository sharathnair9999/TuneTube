import React from "react";
import { Link } from "react-router-dom";
import { constants } from "../../app-utils";
import "./EmptyData.css";

type EmptyDataProps = {
  msg: string;
  imgUrl?: string;
  url?: string;
};

const EmptyData = ({
  msg,
  imgUrl = constants.imgUrls.empty_box,
  url = "",
}: EmptyDataProps) => {
  return (
    <div className="empty-data-container w-100 flex-and-center flex-col">
      <img
        src={imgUrl}
        alt="empty-box "
        className="responsive-img object-cover"
      />
      <p className="msg-text">{msg}</p>
      {url !== "" && (
        <Link className="mt-1 link" to={url} replace={true}>
          Explore All Videos
        </Link>
      )}
    </div>
  );
};

export default EmptyData;
