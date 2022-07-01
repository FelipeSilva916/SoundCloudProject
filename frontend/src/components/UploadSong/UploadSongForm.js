import React from "react";
import { useSelector } from "react-redux";

const UploadSongForm = () => {
  const sessionUser = useSelector((state) => state.session.user);

  let uploadForm;

  return <div></div>;
};

export default UploadSongForm;
