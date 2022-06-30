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
        console.log(data);
        if (data && data.errors) setErrors([data.message]);
      }
    );
  };

  const handleDemoUser = (e) => {
    e.preventDefault();
    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <>
      <h2>Welcome back </h2>
      <div className="login-form">
        <form className="login-form" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error} error go here</li>
            ))}
          </ul>

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
            <button className="login-btn" type="submit">
              Log In
            </button>
          </div>
        </form>
        <div className="auth-separator">
          <span>or</span>
        </div>
        <div>
          <form onSubmit={handleDemoUser} className="guest-login-form">
            <button className="guest-login-btn" type="submit">
              Demo Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
