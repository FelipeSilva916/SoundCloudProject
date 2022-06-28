import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
      <h2>Login here </h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <div className="input-wrapper">
          <label>
            Username or Email
            <div>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                placeholder="Username or Email"
                required
              />
            </div>
          </label>
        </div>
        <div className="input-wrapper">
          <label>
            Password
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
          </label>
        </div>
        <div>
          <button className="login-btn" type="submit">
            Log In
          </button>
        </div>
      </form>
      <div>
        <span className="auth-separator">or</span>
      </div>
      <div>
        <form className="guest-login-form">
          <button className="guest-login-btn" type="submit">
            Demo Login
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
