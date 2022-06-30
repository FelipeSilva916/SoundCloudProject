import { NavLink, useHistory } from "react-router-dom";

const HomeButton = () => {
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/");
  };
  return (
    <NavLink to="/" onClick={handleClick}>
      <i className="fas fa-home"></i>
    </NavLink>
  );
};

export default HomeButton;
