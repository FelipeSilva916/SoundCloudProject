import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import HomeButton from "./HomeButton";
import AlbumsButton from "./AlbumsButton";
import SearchBar from "./SearchBar";
import SongsButton from "./SongsButton";
import Welcome from "./Welcome";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <nav className="logged-in-banner">
          <HomeButton />
          <SongsButton />
          <AlbumsButton />
          <SearchBar />
          <ProfileButton user={sessionUser} />
        </nav>
        <Welcome />
      </>
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
              <SearchBar />
              <div className="nav-right">
                <div className="nav-right-ul">
                  <div className="login-nav-li">
                    <LoginFormModal />
                  </div>
                  <div className="signup-nav-li">
                    <SignupFormModal />
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className="banner-words">
            <p className="top-splash-header">
              What's next in music is first on SoundCloud!
            </p>
          </div>
        </div>
      </>
    );
  }

  return <>{isLoaded && sessionLinks}</>;
}

export default Navigation;
