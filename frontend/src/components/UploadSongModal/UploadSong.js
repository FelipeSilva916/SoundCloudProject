import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/song";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const UploadSongForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [previewImage, setPreviewImage] = useState(
    "https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_15a69c89ead36177074484ed6c6e6e89/soundcloud.png"
  );
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const reset = () => {
    setTitle("");
    setPreviewImage("");
    setUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    dispatch(
      actions.createSong({
        userId,
        title,
        previewImage,
        url
      })
    )
      .then(() => history.push(`/songs`))
      .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors) {
          setErrors(data.errors);
        }
      });

    reset();
  };

  return (
    <div>
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
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="previewImage">Image Url</label>
          <input
            type="text"
            name="imagePreview"
            placeholder="Default Cover"
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="url">Song Url</label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="form-btn-wrapper">
          <button>Upload</button>
          <Link className="main-btn" to={"/songs"}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UploadSongForm;
