import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import * as actions from "../../store/song";

const EditSongPage = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;
  const song = useSelector((state) => state.songs[`${songId}`]);
  const [title, setTitle] = useState(song.title);
  const [previewImage, setPreviewImage] = useState(song.previewImage);
  const [url, setUrl] = useState(song.url);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    dispatch(
      actions.editSong({
        id: songId,
        title,
        previewImage,
        url,
        userId
      })
    )
      .then(() => history.push(`/songs/${songId}`))
      .catch(async (res) => {
        const error = await res.json();
        if (error) {
          //possible error.errors
          setErrors(error.errors);
        }
      });
  };

  return (
    <div>
      <h1>Edit Song Page</h1>
    </div>
  );
};

export default EditSongPage;
