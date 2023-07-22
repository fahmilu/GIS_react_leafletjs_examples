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

  const [error_message, setError] = useState("")

  const submit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value; // Get the username from user input
    const password = e.target.password.value; // Get the password from user input
    const encodedCredentials = btoa(`${username}:${password}`);
    const authHeader = `Basic ${encodedCredentials}`;

    const user = {
      username: username,
      password: password,
    };

    const error_message = ''

    try {
      const { data } = await axios.post(
        CONFIG.JWT_TOKEN_LOGIN,
        user,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
          withCredentials: true,
        }
      );

      localStorage.clear();
      localStorage.setItem("login_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data['access']}`;
      console.log(data)

      try {
        const response = await axios.get(
          CONFIG.USER_INFO_GEONODE_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
          withCredentials: true,
        }
        );

        console.log("Response Data:", response.data);
        console.log(response.data.access_token)
        const token_geoserver = response.data.access_token
        localStorage.setItem('access_token', token_geoserver)

        } catch (error) {
        console.log("Error:", error);
      }

      window.location.href = CONFIG.COOKIE_PATH;

    } catch (error) {
      // Handle any error scenarios
      console.error(error);
      const error_message = 'Error - password and username combination or account still not active'
      setError(error_message)
    }
  };

  // set the encoded credentials for use later in user
  //localStorage.setItem('basic_auth', encodedCredentials);

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
            {error_message != '' && <p>{error_message}</p>}
          </div>
        </form>
      </div>
      <h3>If you want to register, please follow this <a href="/register">link</a></h3>
    </div>
  );
};