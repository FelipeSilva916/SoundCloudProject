import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

const DemoUser = () => {
  const dispatch = useDispatch();
  const [credential] = useState("Demo-lition");
  const [password] = useState("password");

  const handleSubmit = (e) => {
    return dispatch(
      sessionActions.login({
        credential,
        password
      })
    );
  };

  return (
    <button className="guest-login-btn" onClick={handleSubmit}>
      Demo Login
    </button>
  );
};

export default DemoUser;
