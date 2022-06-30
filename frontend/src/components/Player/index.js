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
        src="https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/StartingOver.mp3"
        onPlay={(e) => console.log("onPlay")}
        // other props here
      />
    </div>
  );
};

// const Player = () => (
//   <AudioPlayer
//     src="https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/StartingOver.mp3"
//     onPlay={(e) => console.log("onPlay")}
//     // other props here
//   />
// );
export default Player;
