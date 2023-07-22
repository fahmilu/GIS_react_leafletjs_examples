// Import the react JS packages
import { useEffect, useState, useCallback } from "react";
import axios from "axios";


//axios.defaults.withCredentials = true; // Enable sending cookies with requests

//axios.defaults.xsrfCookieName = "csrftoken";
//axios.defaults.xsrfHeaderName = "X-CSRFToken";

// Define the Login function.

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
            'http://192.168.56.5:8000/catalyze/jwt/', {
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
    <div className="form-signin mt-5 text-center">
      <h3>Hi {message}</h3>
      {code === null && <button onClick={handleLogin}>OAUTH2_AUTHORIZE</button>}
      {code != null && (
        <iframe
          id='myIframe'
          src="http://192.168.56.5:8000/maps/5/embed"
          height="1000" width="1000" title="Iframe Example">
        </iframe>)}
    </div>);
}