import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as actions from "../../store/song";

const EditSongForm = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;
  const song = useSelector((state) => state.songs[`${songId}`]);
  const [title, setTitle] = useState(song.title);
  const [previewImage, setPreviewImage] = useState(song.previewImage);
  const [url, setUrl] = useState(song.url);
  const [errors, setErrors] = useState([]);

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
          setErrors(error.errors);
        }
      });
  };

  return (
    <div>
      <h1>Edit Song Page</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {Object.values(errors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <label htmlFor="previewImage">Preview Image</label>
            <input
              type="text"
              id="previewImage"
              name="previewImage"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="url">URL</label>
            <input
              type="text"
              id="url"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div>
            <button>Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditSongForm;
