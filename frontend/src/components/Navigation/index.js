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
import ReactAudioPlayer from "react-audio-player";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <nav className="logged-in-banner">
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
                <ul className="nav-right-ul">
                  <li className="login-nav-li">
                    <LoginFormModal />
                  </li>
                  <li className="signup-nav-li">
                    <SignupFormModal />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="banner-words">
            <p className="top-splash-header">
              What's next in music is first on SoundCloud!
            </p>
          </div>
          <div>
            <h3 style={{ backgroundColor: "white" }}>Play Demo Song </h3>
            <ReactAudioPlayer
              src="https://felipesoundcloudclone.s3.us-west-1.amazonaws.com/6FeetUnder_by_JohnCoggins_Artlist.wav"
              autoPlay
              controls
            />
          </div>
        </div>
      </>
    );
  }

  return <>{isLoaded && sessionLinks}</>;
}

export default Navigation;
