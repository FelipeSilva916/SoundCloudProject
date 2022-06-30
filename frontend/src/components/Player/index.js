import React from "react";
import ReactAudioPlayer from "react-audio-player";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
        <div>
          <div style={{ backgroundImage: "url(" + song.imageUrl + ")" }}></div>
          <div className="song-details-sm">
            <Link to={{ pathname: `/users/${song.User.id}` }}>
              {song.User.username}
            </Link>
            <Link to={{ pathname: `/songs/${song.id}` }}>
              <p>{song.title}</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
