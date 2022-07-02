import React from "react";
import { useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./Player.css";

const Player = () => {
  const song = useSelector((state) => state.player.song);

  return (
    <div>
      <AudioPlayer
        src={song?.url}
        onPlay={(e) => console.log("onPlay")}
        header={song?.title}
        showSkipControls={true}
      />
    </div>
  );
};

export default Player;
