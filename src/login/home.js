// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
// Define the Login function.
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
        </div> )
}