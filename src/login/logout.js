import { useEffect } from "react";
import axios from "axios";

//axios.defaults.withCredentials = true; // Enable sending cookies with requests

//axios.defaults.xsrfCookieName = "csrftoken";
//axios.defaults.xsrfHeaderName = "X-CSRFToken";

export const Logout = () => {
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('access_token'); // Retrieve the bearer token from the login data
        
        // Set the authorization header with the bearer token
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        
        const { data } = await axios.post(
          "http://192.168.56.5:8000/logout/",
          { refresh: localStorage.getItem("refresh_token") },
          { withCredentials: true }
        );

        localStorage.clear();
        delete axios.defaults.headers.common["Authorization"]; // Remove the authorization header after logout
        window.location.href = "/login";
      } catch (e) {
        console.log("logout not working", e);
      }
    })();
  }, []);

  return <div></div>;
};