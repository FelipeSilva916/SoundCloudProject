import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import AllSongs from "../AllSongs";
import HomeButton from "./HomeButton";
import AlbumsButton from "./AlbumsButton";
import SearchBar from "./SearchBar";
import SongsButton from "./SongsButton";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <nav className="top-splash">
        <HomeButton />
        <SongsButton />
        <AlbumsButton />
        <SearchBar />
        <ProfileButton user={sessionUser} />
      </nav>
    );
  } else {
    sessionLinks = (
      <>
        <div className="banner-container">
          <nav className="navigation">
            <div className="top-splash">
              <div className="logo-container">
                <img
                  className="logo-image"
                  src={require("../../images/logo.png")}
                  alt="logo"
                />
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
                  <li className="nav-li">
                    <LoginFormModal />
                    <SignupFormModal />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </>
    );
  }

  return <>{isLoaded && sessionLinks}</>;
}

export default Navigation;
