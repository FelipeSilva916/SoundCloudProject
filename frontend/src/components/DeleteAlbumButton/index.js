import React from "react";
import { useDispatch } from "react-redux";
import "./DeleteAlbumButton.css";
import { deleteAlbum } from "../../store/albums";
import { useHistory } from "react-router-dom";

const DeleteAlbumButton = ({ albumId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = (albumId) => {
    dispatch(deleteAlbum(albumId));
    history.push("/albums");
  };
  return <button onClick={() => handleDelete(albumId)}>Delete Album</button>;
};

export default DeleteAlbumButton;
