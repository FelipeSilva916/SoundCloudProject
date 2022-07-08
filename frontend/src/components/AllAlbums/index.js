import React, { useEffect, useState } from "react";
import * as albumActions from "../../store/albums";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllAlbums = () => {
  const dispatch = useDispatch();
  const albums = useSelector((state) => Object.values(state.albums));
  const [currentAlbum, setCurrentAlbum] = useState(null);

  useEffect(() => {
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
            >
              Each album goes here
              <Link to={{ pathname: `/albums/${album.id}` }}>
                <p>{album.title}</p>
              </Link>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default AllAlbums;
