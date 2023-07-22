// Import the react JS packages
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CONFIG from "../config";

import Map from "../Map/Map";

// if django session authenticated enabled
//axios.defaults.withCredentials = true; // Enable sending cookies with requests

//axios.defaults.xsrfCookieName = "csrftoken";
//axios.defaults.xsrfHeaderName = "X-CSRFToken";

// Define the Login function.

export const Home = () => {
  const [message, setMessage] = useState('');
  const code = localStorage.getItem('code');

  const handleLogin = useCallback(async () => {

    const reqParams = [
      `response_type=${CONFIG.RESPONSE_TYPE}`,
      `client_id=${CONFIG.CLIENT_ID}`,
      `redirect_uri=${CONFIG.REDIRECT_URI}`,
    ].join("&");  // joining into single text with & in the middle

    try {
      const response = await fetch(`${CONFIG.AUTHORIZE_ENDPOINT}?${reqParams}`);
      const url = await response.text();
      const url_noawait = `${CONFIG.AUTHORIZE_ENDPOINT}?${reqParams}`;
      window.location.assign(url);
      window.open(url_noawait, '_blank')
    } catch (e) {
      console.error(e);
    }

  }, []);

  useEffect(() => {

    if (localStorage.getItem('login_token') === null) {
      window.location.href = '/login'
    }
    else {
      (async () => {
        try {
          const token = localStorage.getItem('login_token');
          console.log(localStorage);

          const { data } = await axios.get(
            CONFIG.EXAMPLE_HOME, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          }
          );
          setMessage(data.message);

          //console.log(localStorage.getItem('access_token'))
        } catch (e) {
          console.log('not auth')
        }
      })()
    };

  }, []);

  return (
    <div>
      {/*code != null && <Map />*/}
      {localStorage.getItem('login_token') != null && <Map />}
      <div className="form-signin mt-5 text-center">
        <h3>Hi {message}</h3>
        {code === null && <button onClick={handleLogin}>OAUTH2_AUTHORIZE</button>}
        {code != null && (
          <iframe
            id='myIframe'
            src={CONFIG.EXAMPLE_IFRAME}
            height="1000" width="1000" title="Iframe Example">
          </iframe>)}
      </div>
    </div>);
}