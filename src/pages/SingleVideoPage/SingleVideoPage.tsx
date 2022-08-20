import React, { useEffect, useRef, useState } from "react";
import "./SingleVideoPage.css";
import ReactPlayer from "react-player";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth, useVideos } from "../../contexts";
import { useDocumentTitle } from "../../custom-hooks";
import { constants } from "../../app-utils";
import ReactTooltip from "react-tooltip";
import {
  Like,
  PlaylistButton,
  SkeletalLoading,
  VideoActionSection,
  WatchLaterButton,
} from "../../components";
import { VideoType } from "../../contexts/Video-Context/VideoContext.types";

const SingleVideoPage = () => {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const { titles } = constants;
  const [expanded, setExpanded] = useState(false);
  const {
    videosState: { currVideo, isVideoLoading, allVideos },
    getAllVideos,
    getVideo,
    getThumbnail,
  } = useVideos();

  const {
    userState: { isLoggedIn, history },
    addToHistory,
  } = useAuth();

  const setDocuemntTitle = useDocumentTitle("");
  useEffect(() => {
    (async () => {
      await getVideo(videoId);
    })();
    allVideos.length === 0 && getAllVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  useEffect(() => {
    setDocuemntTitle(titles.video(currVideo.title));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currVideo]);

  const isInHistory = history.some(
    (historyVideo: VideoType) => historyVideo._id === currVideo._id
  );
  const scrollToTop = () => {
    mainContainerRef?.current?.scroll(0, 0);
  };
  useEffect(() => {
    scrollToTop();
  }, [pathname, videoId]);

  const handleHistory = () => {
    isLoggedIn &&
      !isInHistory &&
      setTimeout(() => {
        addToHistory(currVideo);
      }, 2000);
  };

  const nextVideos = allVideos.filter(
    (video: VideoType) => video._id !== currVideo._id
  );

  return (
    <div ref={mainContainerRef} className="video-page-container">
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
              onStart={handleHistory}
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
              <Like video={currVideo} />
              <WatchLaterButton video={currVideo} />
              <PlaylistButton video={currVideo} />
            </div>
          </div>
        </div>
      </div>
      <div className="next-videos flex-col flex justify-fs items-center gap-sm">
        {allVideos.length !== 0
          ? nextVideos.map((video: VideoType) => (
              <div
                key={video._id}
                className="horizontal-video-card flex items-fs justify-fs gap-sm"
              >
                <div className="relative-container">
                  <img
                    onClick={() => navigate(`/explore/${video._id}`)}
                    src={getThumbnail(video._id)}
                    alt={video.title}
                    className="responsive-img object-cover"
                  />
                  <span className="duration">{video.duration}</span>
                </div>
                <div className="card-details flex-col flex justify-fs items-fs">
                  <ReactTooltip place="top" effect="solid" />
                  <p className="video-title">
                    <Link to={`/explore/${video._id}`} data-tip={video.title}>
                      {video.title}
                    </Link>
                  </p>
                  <p className="video-creator">{video.creator}</p>
                  <p className="video-upload-date">{video.uploadedOn}</p>
                  <span className="pr-1 mt-1 ml-auto">
                    <VideoActionSection video={video} exploreCard />
                  </span>
                </div>
              </div>
            ))
          : [...Array(8)].map((_, _id) => (
              <SkeletalLoading key={_id} sideCards />
            ))}
      </div>
    </div>
  );
};

export default SingleVideoPage;
