import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editAlbum } from "../../store/albums";

const EditAlbumForm = ({ setShowModal }) => {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const album = useSelector((state) => state.albums[`${albumId}`]);
  const [title, setTitle] = useState(album.title);
  const [previewImage, setPreviewImage] = useState(album.previewImage);
  const [description, setDescription] = useState(album.description);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);

    await dispatch(
      editAlbum({
        id: albumId,
        title,
        previewImage,
        description
      })
    )
      .then(() => {
        setShowModal(false);
        history.push(`/albums`);
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
            <label htmlFor="previewImage">Preview Image</label>
            <input
              className="edit-input"
              type="text"
              id="previewImage"
              name="previewImage"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="url">Description</label>
            <input
              className="edit-input"
              type="text"
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

export default EditAlbumForm;
