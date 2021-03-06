import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllSongs } from "../../store/song";
import { playSong } from "../../store/player";
import "./AllSongs.css";

const AllSongs = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => Object.values(state.songs));

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);

  const SongBtn = useCallback(
    (song) => {
      dispatch(playSong(song));
    },
    [dispatch]
  );

  if (!songs) {
    return null;
  }

  return (
    <div className="all-songs-wrapper">
      <div className="player-box"></div>
      <div>
        {songs.map((song) => (
          <li key={song.id} className="song-card">
            <div
              className="card-img-wrapper"
              style={{ backgroundImage: "url(" + song.previewImage + ")" }}
            >
              <div className="play-action-overlay">
                <button
                  className="play-button-allsongs"
                  onClick={() => {
                    SongBtn(song);
                  }}
                >
                  <i className="fas fa-play"></i>
                </button>
              </div>
            </div>
            <Link
              className="song-link-text"
              to={{ pathname: `/songs/${song.id}` }}
            >
              <p>{song.title}</p>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default AllSongs;
