import React from "react";
import ReactAudioPlayer from "react-audio-player";
import { useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Player = () => {
  const song = useSelector((state) => state.player.song);

  return (
    <div>
      <AudioPlayer
        src={song?.url}
        onPlay={(e) => console.log("onPlay")}
        // other props here
      />
    </div>
  );
};

export default Player;
