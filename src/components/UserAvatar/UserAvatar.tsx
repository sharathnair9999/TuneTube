import React from "react";
import ReactTooltip from "react-tooltip";
import { FiLogOut } from "react-icons/fi";

const UserAvatar = ({ logoutUser }: { logoutUser: () => void }) => {
  return (
    <div>
      <ReactTooltip place="bottom" effect="solid" />
      <span
        className="user-profile pointer"
        data-tip="Logout"
        onClick={() => logoutUser()}
      >
        <FiLogOut />
      </span>
    </div>
  );
};

export default UserAvatar;
