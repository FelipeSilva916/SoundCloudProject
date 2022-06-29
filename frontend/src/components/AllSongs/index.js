import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllSongs } from "../../store/song";
import "./AllSongs.css";

const AllSongs = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => Object.values(state.songs));

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);

  if (!songs) {
    return null;
  }

  return (
    <div className="songs-list-full-wrapper">
      <h2>Listen to the latest uploads below.</h2>
      <div>
        {songs.map((song) => (
          <li key={song.id}>
            <Link className="song-link-text" to={`/songs/${song.id}`}>
              {song.title}
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default AllSongs;
