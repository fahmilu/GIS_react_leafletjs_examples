import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CONFIG = {
  TOKEN_ENDPOINT: "http://192.168.56.5:8000/o/token/",
  AUTHORIZE_ENDPOINT: "http://192.168.56.5:8000/o/authorize/",
  RESPONSE_TYPE: "code",
  SCOPE: "openid",
  REDIRECT_URI: "http://192.168.56.5:3000/login-geonode",
  CLIENT_ID: "HpK94cv5bSqdgItYXftaOcLIhW00oDWqe0hVty3u",
  CLIENT_SECRET: "yCmhMewgaJA3sC8Hh1MTUjr7jzjpTAzkUnyGBCFlSfAmrpfeD8E6kZiShVpp40xMclqsJ6GbbMzMxUrTVuvqQiTir3DD85sZxAdkzP4Sx1W2hXxjpMWKLH5OUG01zMZZ",
  GRANT_TYPE: "authorization_code",
  CLIENT_URL: "http://192.168.56.5:3000",
  LOGOUT_URL: "http://192.168.56.5:3000/logout",
  COOKIE_PATH: "/"
};

const OAuth2CallbackPage = () => {
  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    const code = (location.search.match(/code=([^&]+)/) || [])[1];

    /*
    const exchangeCodeForToken = async (authorizationCode) => {
      const requestData = {
        grant_type: 'authorization_code',
        code: authorizationCode,
        client_id: CONFIG.CLIENT_ID,
        client_secret: CONFIG.CLIENT_SECRET,
        redirect_uri: CONFIG.REDIRECT_URI,
      };

  
      try {
        const response = await fetch(CONFIG.TOKEN_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
          //withCredentials: true,
        });
        const data = await response.json();
        //const accessToken = data.access_token;

        // Use the access token as needed
        //console.log(accessToken);
        return accessToken;
      } catch (error) {
        console.error(error);
      }
      
    };
    
    
    if (code) {
      exchangeCodeForToken(code)
        .then((accessToken) => {
          // Save the access token to localStorage or state management system for later use
          localStorage.setItem('access_token', accessToken); //still give you undefine
          
          history('/');
        })
        .catch((error) => {
          console.error(error);
        });
    }
    */
    const qParams = [
      `code=${code}`,
      `redirect_uri= ${CONFIG.REDIRECT_URI}`,
    ].join("&");
    fetch(`${CONFIG.TOKEN_ENDPOINT}?${qParams}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(console.error);

    history('/');


  }, [location.search, history]);

  return <p>{location.search}</p>;
};

export default OAuth2CallbackPage;