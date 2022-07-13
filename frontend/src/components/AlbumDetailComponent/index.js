import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as albumActions from "../../store/albums";
import * as songActions from "../../store/song";
import * as userActions from "../../store/users";
import { playSong } from "../../store/player";
import "./AlbumDetail.css";
import DeleteAlbumButton from "../DeleteAlbumButton";
import EditAlbumModal from "../EditAlbumModal";
import UploadSongModal from "../UploadSongModal";

const AlbumDetail = ({ albums }) => {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const users = Object.values(useSelector((state) => state.users));
  const songs = Object.values(useSelector((state) => state.songs));
  const currentUser = useSelector((state) => state.session.user);
  const albumSongs = songs?.filter((song) => song.albumId === +albumId);
  const album = albums?.find((album) => album.id === +albumId);
  const artist = users?.find((user) => album?.userId === user.id);

  useEffect(() => {
    dispatch(albumActions?.loadAlbums());
    dispatch(songActions?.getAllSongs());
    dispatch(userActions?.fetchUsers());
  }, [dispatch]);

  const playSongButton = useCallback(
    (song) => {
      dispatch(playSong(song));
    },
    [dispatch]
  );

  let userManipulateButton;

  if (album?.userId === currentUser?.id) {
    userManipulateButton = (
      <div className="user-buttons">
        <div>
          <UploadSongModal albumId={albumId} />
        </div>
        <div className="user-delete-button">
          <DeleteAlbumButton albumId={albumId} />
        </div>
        <div className="user-edit-button">
          <EditAlbumModal album={albumId} />
        </div>
      </div>
    );
  }

  return (
    <div className="album-detail-page-content">
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
        </div>
      </div>
      <div className="album-detail-body-right">
        <div className="album-song-list-header">
          {albumSongs?.map((song, idx) => (
            <div
              className="album-song-list-item"
              key={idx}
              onClick={() => {
                playSongButton(song);
              }}
            >
              <li key={idx}>
                {idx + 1}. {song.title}
              </li>
              <button
                className="fa-solid fa-circle-play"
                onClick={(e) => {
                  e.preventDefault();
                  playSongButton(song);
                }}
              ></button>
            </div>
          ))}
        </div>
        <div>{userManipulateButton}</div>
      </div>
    </div>
  );
};

export default AlbumDetail;
