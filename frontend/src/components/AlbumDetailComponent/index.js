import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as albumActions from "../../store/albums";
import * as songActions from "../../store/song";
import * as userActions from "../../store/users";
import H5AudioPlayer from "react-h5-audio-player";
import "./AlbumDetail.css";

const AlbumDetail = ({ albums }) => {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const users = Object.values(useSelector((state) => state.users));
  const songs = Object.values(useSelector((state) => state.songs));
  const currentUser = useSelector((state) => state.session.user);
  const [url, setUrl] = useState("");
  const albumSongs = songs?.filter((song) => song.albumId === +albumId);
  const album = albums?.find((album) => album.id === +albumId);
  const artist = users?.find((user) => album?.userId === user.id);
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  console.log(artist);

  useEffect(() => {
    dispatch(albumActions?.loadAlbums());
    dispatch(songActions?.getAllSongs());
    dispatch(userActions?.fetchUsers());
  }, [dispatch]);

  let userManipulateButton;

  if (album?.userId === currentUser?.id) {
    userManipulateButton = (
      <div className="user-buttons">
        <div className="user-delete-button">
          <button>Delete album</button>
        </div>
        <div className="user-edit-button">
          <button>Edit Album</button>
        </div>
      </div>
    );
  }

  return (
    <div className="album-detail-container">
      <div className="album-detail-body-left album-detail-container-div">
        <div className="album-detail-img-wrapper album-detail-container-div">
          <div className="album-preview-image album-detail-container-div">
            <img src={album?.previewImage} alt="album cover" />
          </div>
          <div className="album-info-wrapper">
            <h1 className="album-title">{album?.title}</h1>
            <h2 className="album-artist">{artist?.username}</h2>
            <p className="album-description">{album?.description}</p>
          </div>
        </div>
        <div className="album-detail-body-right">
          <div className="album-song-list-header">
            {albumSongs?.map((song, idx) => (
              <div
                className="album-song-list-item"
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  setUrl(song.url);
                }}
              >
                <li key={idx}>
                  {idx + 1}. {song.title}
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
          <div>{userManipulateButton} Test</div>
        </div>
      </div>
      <div className="footer-player">
        <H5AudioPlayer src={url} autoPlay={false} />
      </div>
    </div>
  );
};

export default AlbumDetail;
