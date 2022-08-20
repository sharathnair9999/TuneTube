import React from "react";
import "./SplashScreen.css";

const SplashScreen = () => {
  return (
    <div className="splash-screen-container">
      <img src="/box-loading.gif" alt="box loading" className="splash-img" />
      <p className="splash-text">Unboxing...</p>
    </div>
  );
};

export default SplashScreen;
