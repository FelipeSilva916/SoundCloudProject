import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as albumActions from "../../store/albums";
import * as songActions from "../../store/song";
import * as userActions from "../../store/users";
import H5AudioPlayer from "react-h5-audio-player";
import "./AlbumDetail.css";
import DeleteAlbumButton from "../DeleteAlbumButton";

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
          <DeleteAlbumButton albumId={albumId} />
        </div>
        <div className="user-edit-button">
          <button>Edit Album</button>
        </div>
      </div>
    );
  }

  return (
    <div className="album-detail-container">
      <div className="album-detail-body-left">
        <div className="album-detail-img-wrapper ">
          <div className="album-preview-image ">
            <img src={album?.previewImage} alt="album cover" />
          </div>
        </div>
        <div className="album-info-wrapper">
          <h1 className="album-title">{album?.title}</h1>
          <h2 className="album-artist">{artist?.username}</h2>
          <p className="album-description">{album?.description}</p>
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
          <div>{userManipulateButton}</div>
        </div>
      </div>
      <div className="footer-player">
        <H5AudioPlayer src={url} autoPlay={false} />
      </div>
    </div>
  );
};

export default AlbumDetail;
