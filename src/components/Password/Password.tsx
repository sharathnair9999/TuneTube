import React, { ChangeEvent, useState } from "react";
import "./Password.css";
import ReactTooltip from "react-tooltip";
import { BiShow, BiHide } from "react-icons/bi";

type PasswordProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  fieldValue: string;
  fieldName: string;
};

const Password: React.FC<PasswordProps & React.HTMLProps<HTMLInputElement>> = ({
  onChange,
  fieldValue,
  fieldName,
  ...other
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="password">
      <ReactTooltip place="bottom" effect="solid" />
      <input
        type={`${showPassword ? "text" : "password"}`}
        required
        className="input-box"
        value={fieldValue}
        name={fieldName}
        onChange={onChange}
        {...other}
      />
      <span
        data-tip={showPassword ? "Hide" : "Show"}
        className="show-password pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <BiHide /> : <BiShow />}
      </span>
    </div>
  );
};

export default Password;
