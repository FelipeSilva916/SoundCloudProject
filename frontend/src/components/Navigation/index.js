import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink activeStyle={{ fontWeight: 700 }} to="/login">
          Log In
        </NavLink>
        <NavLink className="signup" to="/signup">
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
    <nav className="navigation">
      <div className="top-splash">
        <div className="nav-right">
          <ul>
            <li>
              <NavLink exact to="/">
                Home
              </NavLink>
              {isLoaded && sessionLinks}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
