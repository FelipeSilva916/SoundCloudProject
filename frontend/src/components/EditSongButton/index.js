import React from "react";
import { useParams } from "react-router-dom";
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
      <button>Edit song</button>
    </div>
  );
};

export default EditSongButton;
