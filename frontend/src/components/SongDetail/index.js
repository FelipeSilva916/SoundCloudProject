import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { getAllSongs } from "../../store/song";
import { playSong } from "../../store/player";
import "./SongDetail.css";

const SongDetails = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  //   const songs = useSelector((state) => state.songs);
  const history = useHistory();
  const songs = useSelector((state) => Object.values(state.songs));

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch, songId]);

  const song = songs[songId];
  console.log(songs.id);
  const handleEditBtn = (songId) => {
    history.push(`/songs/${songId}/edit`);
  };

  const playSongBtn = useCallback(
    (song) => {
      dispatch(playSong(song));
    },
    [dispatch]
  );

  return (
    <div className="song-portal-lrg">
      <div>
        <div className="portal-song-details">
          <div>
            <button
              className="primary-play-btn"
              onClick={() => playSongBtn(song)}
            >
              <i className="fas fa-play"></i>
            </button>
            <div>
              <h2>{song?.title}</h2>
              <Link
                className="song-hero-link"
                to={{ pathname: `/users/${song?.userId}` }}
              >
                <h3>{user.username}</h3>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="song-img-lrg"
          style={{ backgroundImage: "url(" + song?.previewImage + ")" }}
        ></div>
      </div>
    </div>
  );
};

export default SongDetails;
