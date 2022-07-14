import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSong } from "../../store/song";
import { playSong } from "../../store/player";
import DeleteSongButton from "../DeleteSongButton";
import EditSongModal from "../EditSongModal";
import "./SongDetail.css";

const SongDetails = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const songObject = useSelector((state) => state.songs);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSong(songId));
  }, [dispatch, songId]);

  const song = songObject[songId];
  console.log(song);
  const playSongBtn = useCallback(
    (song) => {
      dispatch(playSong(song));
    },
    [dispatch]
  );

  let userManipulateButton;

  if (song?.userId === user?.id) {
    userManipulateButton = (
      <div className="user-buttons">
        <div className="user-delete-button">
          <DeleteSongButton songId={songId} />
        </div>
        <div className="user-edit-button">
          <EditSongModal song={songId} />
        </div>
      </div>
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

            <div className="play-button-song-detail">
              <button
                className="fa-solid fa-circle-play play-btn"
                onClick={(e) => {
                  e.preventDefault();
                  playSongBtn(song);
                }}
              ></button>
            </div>
            <div className="footer-container">
              <div className="song-detail-footer">{userManipulateButton}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SongDetails;
