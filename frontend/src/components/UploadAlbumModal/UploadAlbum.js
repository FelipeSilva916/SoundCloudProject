import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createAlbum } from "../../store/albums";

const UploadAlbumForm = ({ setShowModal }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = sessionUser.id;
  const [title, setTitle] = useState("");
  const [previewImage, setPreviewImage] = useState(
    "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/defaultLogo.png"
  );
  const [description, setDescription] = useState("");
  const [Submit, setSubmit] = useState("Submit");
  const [errors, setErrors] = useState([]);

  const reset = () => {
    setTitle("");
    setPreviewImage("");
    setDescription("");
    setSubmit("Submit");
    setErrors([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors([]);
    setSubmit(<div className="fas fa-spinner fa-pulse"></div>);

    dispatch(
      createAlbum({
        userId,
        title,
        previewImage,
        description
      })
    )
      .then(() => {
        setShowModal(false);
        history.push("/albums");
      })
      .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors) {
          setSubmit("Submit");
          setErrors(data.errors);
        }
      });
    reset();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setShowModal(false);
    history.push("/albums");
  };

  const updateImgFile = (e) => {
    const imgFile = e.target.files[0];
    setPreviewImage(imgFile);
  };

  return (
    <div className="create-album-form">
      <h2>Create An Album</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {Object.values(errors).map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>

        <div className="input-container">
          <label htmlFor="title">Title</label>
          <input
            className="upload-input"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="previewImage">Image</label>
          <input
            required
            type="file"
            name="imagePreview"
            placeholder="Default Cover"
            onChange={updateImgFile}
          />
        </div>

        <div className="input-container">
          <label htmlFor="description">Description</label>
          <input
            className="upload-input"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-btn-container">
          <button type="submit" className="create-album-btn-modal">
            {Submit}
          </button>
          <button className="cancel-button" onClick={(e) => handleCancel(e)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadAlbumForm;
