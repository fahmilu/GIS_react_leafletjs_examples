import axios from "axios";
import { useState, useCallback } from "react";

//axios.defaults.withCredentials = true;

//axios.defaults.xsrfCookieName = "csrftoken";
//axios.defaults.xsrfHeaderName = "X-CSRFToken";

import React from 'react';

const CONFIG = {
  TOKEN_ENDPOINT: "http://192.168.56.5:8000/o/token/",
  AUTHORIZE_ENDPOINT: "http://192.168.56.5:8000/o/authorize/",
  RESPONSE_TYPE: "code",
  SCOPE: "openid",
  REDIRECT_URI: "http://192.168.56.4:3000/login-geonode",
  CLIENT_ID: "HpK94cv5bSqdgItYXftaOcLIhW00oDWqe0hVty3u",
  CLIENT_SECRET: "yCmhMewgaJA3sC8Hh1MTUjr7jzjpTAzkUnyGBCFlSfAmrpfeD8E6kZiShVpp40xMclqsJ6GbbMzMxUrTVuvqQiTir3DD85sZxAdkzP4Sx1W2hXxjpMWKLH5OUG01zMZZ",
  GRANT_TYPE: "authorization_code",
  CLIENT_URL: "http://192.168.56.4:3000",
  LOGOUT_URL: "http://192.168.56.4:3000/logout",
  COOKIE_PATH: "/"
};

export const Login = () => {
  /*
  const handleLogin = () => {
    const authorizeUrl = 'http://192.168.56.5:8000/o/authorize/?response_type=code&client_id=HpK94cv5bSqdgItYXftaOcLIhW00oDWqe0hVty3u&redirect_uri=http://192.168.56.5:3000/login-geonode';
    //window.open(authorizeUrl, '_blank');
    window.open(authorizeUrl)
  };
  */

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
        "http://192.168.56.5:8000/catalyze/token/",
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
      window.location.href = "/";
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