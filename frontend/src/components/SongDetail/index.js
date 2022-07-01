import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { getAllSongs } from "../../store/song";
import { playSong } from "../../store/song";
// import SongDelete from "../SongDelete";
import "./SongDetail.css";

const SongDetails = () => {
  const { songId } = useParams();
};

export default SongDetails;
