import React from "react";

const Welcome = () => {
  return (
    <div className="welcome-comp">
      <p className="welcome-text">Welcome to SoundCloud!</p>
      <img
        className="banner-container-welcome"
        src={require("../../images/Soundcloud.jpeg")}
        alt="logo"
      />
    </div>
  );
};

export default Welcome;
