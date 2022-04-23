import React, { useState } from "react";
import "./Password.css";
import { BiShow, BiHide } from "react-icons/bi";

const Password = ({ handleChange, fieldValue, fieldName, ...other }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="password">
      <input
        type={`${showPassword ? "text" : "password"}`}
        required
        className="input-box"
        id="password"
        value={fieldValue}
        name={fieldName}
        onChange={handleChange}
        {...other}
      />
      <span
        className="show-password pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <BiHide /> : <BiShow />}
      </span>
    </div>
  );
};

export default Password;
