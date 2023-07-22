import axios from "axios";
import { useState } from "react";

// if django session authentication activated
//axios.defaults.withCredentials = true;

//axios.defaults.xsrfCookieName = "csrftoken";
//axios.defaults.xsrfHeaderName = "X-CSRFToken";

import React from 'react';
import CONFIG from "../config";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    try {
      const { data } = await axios.post(
       CONFIG.JWT_TOKEN_LOGIN,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      localStorage.clear();
      localStorage.setItem("login_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data['access']}`;;
      window.location.href = CONFIG.COOKIE_PATH;
      console.log(data)
    } catch (error) {
      // Handle any error scenarios
      console.error(error);
    }
  };

  return (
    <div>
      <p>Please log in:</p>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                className="form-control mt-1"
                placeholder="Enter Username"
                name="username"
                type="text"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};