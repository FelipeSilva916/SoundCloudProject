import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/song";
import { useHistory, useParams } from "react-router";
import "./UploadSong.css";

const UploadSongForm = ({ setShowModal }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [previewImage, setPreviewImage] = useState(
    "https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/defaultLogo.png"
  );
  const [url, setUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const reset = () => {
    setTitle("");
    setPreviewImage("");
    setUrl(null);
    setDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);

    await dispatch(
      actions.createSong({
        userId,
        title,
        previewImage,
        url,
        albumId: +albumId,
        description
      })
    )
      .then(() => {
        setShowModal(false);
        if (albumId) {
          history.push(`/albums/${albumId}`);
        } else {
          history.push(`/songs`);
        }
      })
      .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors) {
          setErrors(data.errors);
        }
      });

    reset();
  };

  const updateSongFile = (e) => {
    const SongFile = e.target.files[0];
    setUrl(SongFile);
  };

  const updateImgFile = (e) => {
    const imgFile = e.target.files[0];
    setPreviewImage(imgFile);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowModal(false);
    history.push("/songs");
  };

  return (
    <div className="upload-form">
      <h2>Upload Your New Song Below.</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
        <div className="input-wrapper">
          <label htmlFor="title">Title</label>
          <input
            className="upload-input"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="previewImage">Image</label>
          <input
            className="upload-input-file"
            type="file"
            name="imagePreview"
            placeholder="Default Cover"
            required
            onChange={(e) => updateImgFile(e)}
          />
        </div>

        <div className="input-wrapper">
          <label>Song</label>
          <input
            required
            className="upload-input-file"
            type="file"
            name="url"
            onChange={(e) => updateSongFile(e)}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="description">Description</label>
          <input
            className="upload-input"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-btn-wrapper">
          <button className="upload-button" type="submit">
            Upload
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadSongForm;
