import React from "react";
import { useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./Player.css";

const Player = () => {
  const song = useSelector((state) => state.player.song);

  return (
    <div className="media-player">
      <AudioPlayer
        src={song?.url}
        header={song?.title}
        showSkipControls={false}
        volume={0.4}
      />
    </div>
  );
};

export default Player;
