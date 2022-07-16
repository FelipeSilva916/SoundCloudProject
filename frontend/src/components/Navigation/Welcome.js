import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const user = useSelector((state) => state.session.user);
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
