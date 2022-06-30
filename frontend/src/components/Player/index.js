import React from "react";
import ReactAudioPlayer from "react-audio-player";
import { useSelector } from "react-redux";

const Player = () => {
  const song = useSelector((state) => state.player.song);

  return (
    <>
      <div>
        <ReactAudioPlayer
          src={song.audioUrl}
          autoPlay={false}
          controls={true}
          volume={0.5}
          muted={false}
        />
      </div>
    </>
  );
};

export default Player;
