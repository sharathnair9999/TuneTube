import React, { useEffect, useState } from "react";
import "./SingleVideoPage.css";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { useVideos } from "../../contexts";
import { useDocumentTitle } from "../../custom-hooks";
import { constants } from "../../app-utils";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import {
  MdOutlineWatchLater,
  MdWatchLater,
  MdPlaylistAdd,
  MdPlaylistAddCheck,
} from "react-icons/md";
import { IoIosShareAlt } from "react-icons/io";
import ReactTooltip from "react-tooltip";
import { SkeletalLoading } from "../../components";

const SingleVideoPage = () => {
  const { videoId } = useParams();
  const { titles } = constants;
  const [expanded, setExpanded] = useState(false);
  const {
    videosState: { currVideo, isVideoLoading, allVideos },
    getAllVideos,
    getVideo,
    getThumbnail,
  } = useVideos();

  const [, setDocuemntTitle] = useDocumentTitle("");
  useEffect(() => {
    allVideos.length === 0 && getAllVideos();
    getVideo(videoId);
  }, [videoId]);

  useEffect(() => {
    setDocuemntTitle(titles.video(currVideo.title));
  }, [currVideo]);

  const nextVideos = allVideos.filter((video) => video._id !== currVideo._id);

  return (
    <div className="video-page-container">
      <div className="video-details flex justify-center items-fs flex-col">
        <div className="player-wrapper">
          {isVideoLoading ? (
            <div className="skeleton video-skeleton w-100"></div>
          ) : (
            <ReactPlayer
              url={`${constants.urlPrefix}/${videoId}`}
              className="react-player"
              width="100%"
              height="100%"
              controls
              playing
            />
          )}
        </div>
        <div className="video-text">
          <p className="video-title">{currVideo.title}</p>
          <p className="upload-date">{currVideo.uploadedOn}</p>
          {currVideo?.description?.length > 100 ? (
            <p className="description-box">
              <span className="description">
                {expanded
                  ? currVideo?.description
                  : `${currVideo?.description?.substring(0, 100)}... `}
              </span>
              <button
                className="show-description"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Show Less" : "Show More"}
              </button>
            </p>
          ) : (
            <p className="description">{currVideo?.description}</p>
          )}
          <div className="flex justify-space-btw items-center w-100">
            <div className="creator-info flex-and-center gap-sm">
              <img src={currVideo.creatorImg} alt={currVideo.creator} />
              <span>{currVideo.creator}</span>
            </div>
            <div className="video-actions ml-auto">
              <button>
                <AiOutlineLike />
              </button>
              <button>
                <MdOutlineWatchLater />
              </button>
              <button>
                <MdPlaylistAdd />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="next-videos flex-col flex justify-fs items-center gap-sm">
        {allVideos.length !== 0
          ? nextVideos.map(({ _id, title, creator, uploadedOn }) => (
              <div className="horizontal-video-card flex items-fs justify-fs gap-sm">
                <Link to={`/explore/${_id}`}>
                  <img
                    src={getThumbnail(_id)}
                    alt={title}
                    className="responsive-img"
                  />
                </Link>
                <div className="card-details flex-col flex justify-fs items-fs">
                  <ReactTooltip place="top" effect="solid" />

                  <p className="video-title">
                    <Link to={`/explore/${_id}`} data-tip={title}>
                      {title}
                    </Link>
                  </p>

                  <p className="video-creator">{creator}</p>
                  <p className="video-upload-date">{uploadedOn}</p>
                </div>
              </div>
            ))
          : [...Array(8)].map((_, _id) => <SkeletalLoading sideCards />)}
      </div>
    </div>
  );
};

export default SingleVideoPage;
