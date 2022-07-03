import React from "react";
import Player from "../Player";
import SongDetails from "../SongDetail";

const Welcome = () => {
  return (
    <>
      <div className="welcome-comp">
        <div className="welcome-container">
          <p className="welcome-text">Welcome to SoundCloud!</p>
        </div>
        {/* <SongDetails /> */}
      </div>
    </>
  );
};

export default Welcome;
