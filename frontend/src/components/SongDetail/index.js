import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSong } from "../../store/song";
import { playSong } from "../../store/player";
import DeleteSongButton from "../DeleteSongButton";
import EditSongModal from "../EditSongModal";
import "./SongDetail.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const SongDetails = () => {
  const { songId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const songObject = useSelector((state) => state.songs);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSong(songId));
  }, [dispatch, songId]);

  const song = songObject[songId];

  const playSongBtn = useCallback(
    (song) => {
      dispatch(playSong(song));
    },
    [dispatch]
  );

  let userManipulateButton;

  if (song?.userId === user?.id) {
    userManipulateButton = (
      <>
        <DeleteSongButton songId={songId} />
        <EditSongModal song={songId} />
      </>
    );
  }

  return (
    <>
      <div className="song-detail-container">
        <div className="song-detail-body song-detail-container-div">
          <div className="song-detail-body-left song-detail-container-div">
            <img
              className="song-preview-image song-detail-container-div"
              src={song?.previewImage}
              alt={song?.title}
            />
          </div>
          <div className="song-detail-body-right song-detail-container-div">
            <h1>Title: {song?.title}</h1>
            <h2>Artist: {song?.Artist?.username}</h2>
            <p>Description: {song?.description}</p>
            <div className="song-detail-footer">{userManipulateButton}</div>
          </div>
        </div>
        <div>
          <AudioPlayer
            src={song?.url}
            header={song?.title}
            showSkipControls={true}
            autoPlay={false}
          />
        </div>
      </div>
    </>
  );
};

export default SongDetails;
