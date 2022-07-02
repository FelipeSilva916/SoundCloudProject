import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { getSong } from "../../store/song";
import { playSong } from "../../store/player";
import DeleteSongButton from "../DeleteSongButton";
import EditSongModal from "../EditSongModal";
import "./SongDetail.css";

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

  if (!song) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

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
    <div className="detail-wrapper">
      <div className="song-detail">
        <div className="song-detail-header">
          <h1>{song.title}</h1>
          <h2>{song?.Artist?.username}</h2>
        </div>
        <div className="song-detail-body">
          <div className="song-detail-body-left">
            <img
              className="song-preview-image"
              src={song.previewImage}
              alt={song.title}
            />
          </div>
          <div className="song-detail-body-right">
            <p>{song.description}</p>
            <p>{song.lyrics}</p>
          </div>
        </div>
        <div className="song-detail-footer">{userManipulateButton}</div>
      </div>
    </div>
  );
};

export default SongDetails;
