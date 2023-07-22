import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CONFIG from '../config'

const OAuth2CallbackPage = () => {
  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // retrieve code from oauth2 login authentication
        const code = (location.search.match(/code=([^&]+)/) || [])[1];
        console.log(code);
        localStorage.setItem('code', code);
        const qParams = new URLSearchParams({
          code: code,
          redirect_uri: CONFIG.REDIRECT_URI,
          client_id: CONFIG.CLIENT_ID,
          client_secret: CONFIG.CLIENT_SECRET,
          grant_type: CONFIG.GRANT_TYPE,
        });
        // get the access token for geoserver and some api in geonode (token id)
        const response = await axios.post(CONFIG.TOKEN_ENDPOINT, qParams.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        });

        console.log(response.data);
        // assign the variable if 'code' and 'access_token' are properties in the response data
        const { access_token } = response.data;

        // Store the 'access_token' in localStorage
        localStorage.setItem('access_token', access_token);
        
        history(CONFIG.COOKIE_PATH);
      } catch (error) {
        console.error(error);
      }
    };

    fetchToken();
  }, [location.search]);

  return <p>{location.search}</p>;
};

export default OAuth2CallbackPage;