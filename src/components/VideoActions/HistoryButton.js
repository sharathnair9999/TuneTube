import React from "react";
import { AiOutlineHistory } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { useAuth } from "../../contexts";

const HistoryButton = ({ video }) => {
  const navigate = useNavigate();
  const {
    addToHistory,
    removeVideoFromHistory,
    userState: { history, isLoggedIn },
  } = useAuth();

  const isInHistory = history?.some(
    (historyVideo) => historyVideo._id === video._id
  );
  const handleHistory = () => {
    isLoggedIn
      ? !isInHistory
        ? addToHistory(video)
        : removeVideoFromHistory(video._id)
      : navigate("/login");
  };
  return (
    <button
      className="btn-transparent"
      data-tip="Delete From History"
      onClick={() => handleHistory()}
    >
      <ReactTooltip place="top" effect="solid" />
      <AiOutlineHistory color="white" size={"1.2rem"} />
    </button>
  );
};

export default HistoryButton;
