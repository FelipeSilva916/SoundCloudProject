import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
let sessionLinks;

if(sessionUser){
    sessionLinks = (
        <ProfileButton user={sessionUser}/>
    );
    else {
        sessionsLinks = (
            <>
            <NavLink to='/login'>Log In</NavLink>
            <NavLink to='/signup'>Sign Up</NavLink>
            </>
        )
    }
}

  return (
    <ul>
      <liL>
        <NavLink exact to="/">
          Home
        </NavLink>
        {isLoaded && sessionLinks}
      </liL>
    </ul>
  );
}
