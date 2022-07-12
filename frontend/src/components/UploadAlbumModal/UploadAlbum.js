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
  const [url, setUrl] = useState("");

  return <div></div>;
};

export default UploadAlbumForm;
