import React, { useEffect } from "react";
import * as albumActions from "../../store/albums";
import * as userActions from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./AllAlbums.css";
import UploadAlbumModal from "../UploadAlbumModal";
import "../UploadAlbumModal/UploadAlbum.css";

const AllAlbumsComponent = () => {
  const dispatch = useDispatch();
  const albums = useSelector((state) => Object.values(state.albums));
  const users = useSelector((state) => Object.values(state.users));

  useEffect(() => {
    dispatch(userActions.fetchUsers());
    dispatch(albumActions.loadAlbums());
  }, [dispatch]);

  return (
    <div className="all-albums-wrapper">
      <div className="create-album-btn">
        <UploadAlbumModal />
      </div>
      <div>
        {albums.map((album) => (
          <li key={album.id} className="album-card">
            <div
              className="card-img-wrapper"
              style={{ backgroundImage: `url(${album.previewImage})` }}
            ></div>
            <div>
              <Link
                className="album-link-text"
                to={{ pathname: `/albums/${album.id}` }}
              >
                <p>
                  {album.title} -{" "}
                  {users?.find((user) => user.id === album.userId)?.username}
                </p>
              </Link>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default AllAlbumsComponent;
