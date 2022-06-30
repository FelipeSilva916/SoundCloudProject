import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import DemoUser from "../DemoUser/DemoUser";
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
        console.log(data);
        if (data && data.errors) setErrors([data.message]);
      }
    );
  };

  return (
    <>
      <div className="login-form">
        <h2>Welcome back </h2>
        <form onSubmit={handleSubmit}>
          <div className="error-msg">
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>

          <div className="input-wrapper">
            <label>
              Username or Email
              <div>
                <input
                  className="login-input"
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
                  className="login-input"
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
            <button onSubmit={handleSubmit} className="login-btn" type="submit">
              Log In
            </button>
          </div>
        </form>
        <div className="auth-separator">
          <span>or</span>
        </div>
        <div className="guest-login-form">
          <DemoUser />
        </div>
      </div>
    </>
  );
}

export default LoginForm;
