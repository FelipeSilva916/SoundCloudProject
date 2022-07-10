import React, { useEffect, useState } from "react";
import * as albumActions from "../../store/albums";
import * as userActions from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./AllAlbums.css";

const AllAlbumsComponent = () => {
  const dispatch = useDispatch();
  const albums = useSelector((state) => Object.values(state.albums));

  useEffect(() => {
    dispatch(userActions.fetchUsers());
    dispatch(albumActions.loadAlbums());
  }, [dispatch]);

  return (
    <div className="all-albums-wrapper">
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
                <p>{album.title}</p>
              </Link>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default AllAlbumsComponent;
