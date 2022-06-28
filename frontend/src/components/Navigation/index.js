import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <nav className="navigation">
      <div className="top-splash">
        <img
          className="logo-image"
          src={require("../../images/logo.png")}
          alt="logo"
        />
        <div className="nav-left">
          <NavLink exact to="/">
            Home
          </NavLink>
        </div>
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="Search for artists, bands, tracks..."
          />
        </div>
        <div className="nav-right">
          <ul>
            <li className="nav-li">{isLoaded && sessionLinks}</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
