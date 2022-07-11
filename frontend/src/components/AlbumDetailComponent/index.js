import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as albumActions from "../../store/albums";
import * as songActions from "../../store/song";
import * as userActions from "../../store/users";
import H5AudioPlayer from "react-h5-audio-player";

const AlbumDetail = ({ albums }) => {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const users = Object.values(useSelector((state) => state.users));
  const songs = Object.values(useSelector((state) => state.songs));
  const [url, setUrl] = useState("");
  const albumSongs = songs?.filter((song) => song.albumId === +albumId);
  const album = albums?.find((album) => album.id === +albumId);
  const artist = users?.find((user) => album?.userId === user.id);
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    dispatch(albumActions?.loadAlbums());
    dispatch(songActions?.getAllSongs());
    dispatch(userActions?.fetchUsers());
  }, [dispatch]);

  return (
    <div className="album-detail-wrapper">
      <div className="album-detail-img-wrapper">
        <div className="image-wrapper">
          <img src={album?.previewImage} alt="album cover" />
        </div>
        <div className="album-info-wrapper">
          <h1 className="album-title">{album?.title}</h1>
          <h2 className="album-artist">{artist?.username}</h2>
          <p className="album-description">{album?.description}</p>
        </div>
        <div className="album-song-list-wrapper">
          <div className="album-song-list-header">
            {albumSongs?.map((song, idx) => (
              <div className="album-song-list-item" key={idx}>
                <li key={idx}>
                  {idx + 1}. {song.title} TESTING
                </li>
                <button
                  className="fa-solid fa-circle-play"
                  onClick={(e) => {
                    e.preventDefault();
                    setUrl(song.url);
                  }}
                ></button>
              </div>
            ))}
          </div>
          <div className="footer-player">
            <H5AudioPlayer src={url} autoPlay={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;
