import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="page-container">
      <div className="page-not-found">
        <h2>Nothing here 🫤</h2>
        <h3>
          Let's try again at <Link to="/">Home!</Link>
        </h3>
        <img
          src="http://pa1.narvii.com/7793/cf372465e90a99671431b4f8a5704455600a2b2br1-480-480_00.gif"
          alt="404"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
