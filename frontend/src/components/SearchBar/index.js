import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const songs = useSelector((state) => Object.values(state.songs));

  const activeResults = songs.filter((song) => {
    return (
      song.User?.username?.toLowerCase().includes(search.toLowerCase()) ||
      song.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  const listResults = activeResults.map((song) => {
    return (
      <Link
        to={`/songs/${song.id}`}
        key={song.id}
        onClick={() => setSearch("")}
        className="search-result-link"
      >
        <div className="search-result-li">
          <div className="search-result-li-title">{song.title}</div>
          <div className="search-result-li-artist">
            {song?.Artist?.username}
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="search-bar-container">
      <form className="search-bar-form">
        <div className="search-bar">
          <input
            // className="search-bar-input"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setSearchResults("results-active")}
            onBlur={() => setSearchResults("")}
          />
        </div>
      </form>
      <div className={`search-results ${searchResults}`}>{listResults}</div>
    </div>
  );
};

export default SearchBar;
// <div className="search-bar">
//   <input
//     className="search-input"
//     type="text"
//     placeholder="Search for artists, bands, tracks..."
//   />
// </div>
