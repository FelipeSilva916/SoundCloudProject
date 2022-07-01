import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../store/song";

const DeleteSongButton = ({ songId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = (songId) => {
    dispatch(actions.deleteSong(songId));
    history.push("/songs");
  };
  return (
    <>
      <button onClick={() => handleDelete(songId)}>Delete</button>
    </>
  );
};

export default DeleteSongButton;
