import React from "react";
import ReactTooltip from "react-tooltip";
import { FaUserCircle } from "react-icons/fa";

const UserAvatar = ({ logoutUser }) => {
  return (
    <div>
      <ReactTooltip place="bottom" effect="solid" />
      <span
        className="user-profile pointer"
        data-tip="Logout"
        onClick={() => logoutUser()}
      >
        <FaUserCircle />
      </span>
    </div>
  );
};

export default UserAvatar;
