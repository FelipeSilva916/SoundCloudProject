import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AlbumDetail = ({ albums }) => {
  const { albumId } = useParams();

  const dispatch = useDispatch();

  const album = albums?.find((album) => album.id === albumId);

  return <div></div>;
};

export default AlbumDetail;
