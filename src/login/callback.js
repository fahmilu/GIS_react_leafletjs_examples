import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const OAuth2CallbackPage = () => {
  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    const code = (location.search.match(/code=([^&]+)/) || [])[1];
    console.log(code);
    localStorage.setItem('code', code);
    const qParams = new URLSearchParams({
      code: code,
      redirect_uri: CONFIG.REDIRECT_URI,
      client_id: CONFIG.CLIENT_ID,
      client_secret: CONFIG.CLIENT_SECRET,
      grant_type: CONFIG.GRANT_TYPE
    });

    axios.post(CONFIG.TOKEN_ENDPOINT, qParams.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
      withCredentials: true
    })
      .then(res => {
        console.log(res.data)
        // Assuming that 'code' and 'access_token' are properties in the response data
        const { access_token } = res.data;

        // Store and 'access_token' in localStorage
        localStorage.setItem('access_token', access_token);
      
        }
      )
      .catch(console.error);

    history('/');


  }, [location.search, history]);
  //[]);
  return <p>{location.search}</p>;
};

export default OAuth2CallbackPage;