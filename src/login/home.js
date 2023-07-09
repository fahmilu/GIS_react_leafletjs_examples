// Import the react JS packages
import { useEffect, useState } from "react";
import axios from "axios";
// Define the Login function.
/*
// THIS ONE IS FOR JWT FUNCTION
export const Home = () => {
     const [message, setMessage] = useState('');
     useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/login'
        }
        else{
         (async () => {
           try {
             const token = localStorage.getItem("access_token")
             const {data} = await axios.get(   
                            'http://192.168.56.5:8000/jwt/', {
                             headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                             }}
                           );
             setMessage(data.message);

             console.log(localStorage.getItem('access_token'))
          } catch (e) {
            console.log('not auth')
          }
         })()};
     }, []);
     return (
        <div className="form-signin mt-5 text-center">
          <h3>Hi {message}</h3>
          <iframe src="http://192.168.56.5:8000/maps/5/embed" height="1000" width="1000" title="Iframe Example"></iframe>
        </div> )
}


// ...
*/

axios.defaults.withCredentials = true; // Enable sending cookies with requests

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

// Set the base URL for your API requests
//axios.defaults.baseURL = "http://192.168.56.5:8000";

export const Home = () => {
    const [message, setMessage] = useState('');
  
    useEffect(() => {
      
        fetchData();
      }
    , []);
  
    const fetchData = async () => {
      try {
        
        const response = await axios.get('http://192.168.56.5:8000/jwt/', {
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        const data = response.data; // Check the structure of the response object
        console.log('Response data:', data);
  
        // Update the state based on the correct property name from the response
        setMessage(data.message);
  
        console.log('Access Token:', localStorage.getItem('access_token'));
      } catch (error) {
        console.log('Error:', error);
      }
    };
  
    return (
      <div className="form-signin mt-5 text-center">
        <h3>Hi {message}</h3>
        <iframe src="http://192.168.56.5:8000/maps/5/embed" height="1000" width="1000" title="Iframe Example"></iframe>
      </div>
    );
  };
  
  
  
  