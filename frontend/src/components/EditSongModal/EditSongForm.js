import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as actions from "../../store/song";
import "./EditSongForm.css";

const EditSongForm = ({ setShowModal }) => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;
  const song = useSelector((state) => state.songs[`${songId}`]);
  const [title, setTitle] = useState(song.title);
  const [errors, setErrors] = useState([]);
  const [description, setDescription] = useState(song.description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);

    await dispatch(
      actions.editSong({
        id: songId,
        title,
        description,
        userId
      })
    )
      .then(() => {
        setShowModal(false);
        history.push(`/songs/${songId}`);
      })
      .catch(async (res) => {
        const error = await res.json();
        if (error) {
          setErrors(error.errors);
        }
      });
  };

  return (
    <div className="edit-form">
      <h1>Make Some Changes Here:</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {Object.values(errors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="input-wrapper">
          <label htmlFor="title">Title</label>
          <input
            className="edit-input"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="input-wrapper">
            <label htmlFor="description">Description</label>
            <input
              placeholder="Edit the description here"
              className="edit-input"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <button className="edit-button" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditSongForm;
