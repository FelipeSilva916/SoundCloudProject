import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSongs } from "../../store/song";

const Welcome = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);

  if (user) {
    return (
      <>
        <div className="welcome-comp">
          <div className="welcome-container">
            <p className="welcome-text">Welcome,</p>
            <p className="welcome-text"> {user?.username} </p>
            <p className="welcome-text">to your SoundCloud!</p>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default Welcome;
