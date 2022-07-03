const SearchBar = () => {
  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Search for artists, bands, tracks..."
      />{" "}
      <img
        src="https://www.kindacode.com/wp-content/uploads/2020/12/search.png"
        alt="mag-glass"
      ></img>
    </div>
  );
};
export default SearchBar;
