import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditSongPage from "./EditSongPage";

const EditSongButton = () => {
  const { songId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.songs[songId]);

  let editSongPage;
  if (sessionUser.id === song?.User?.id) {
    editSongPage = <EditSongPage />;
  }

  return (
    <div>
      <NavLink to={`/songs/${songId}/edit`}>EDIT</NavLink>
    </div>
  );
};

export default EditSongButton;
