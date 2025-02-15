import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import secret from "../secret.json"
import './Login.css';

function Login() {
  window.localStorage.clear()
  const navigate = useNavigate();
  const GoogleLogin= async(credentials) =>{
    console.log(credentials);
    try {
      const Response = await axios.post('https://oauth2.googleapis.com/token',
        {
          code: credentials.code,
          client_id: secret.web.client_id,
          client_secret: secret.web.client_secret,
          redirect_uri:  "http://localhost:3001",
          grant_type: "authorization_code",
        }
      );
      const accessToken = Response.data.access_token;
      const userInfoResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userData = userInfoResponse.data;
      console.log("User Data:", userData);
      localStorage.setItem("userData", JSON.stringify(userData));
      console.log("localstorage", JSON.parse(localStorage.getItem("userData")));
      if(userData){
        navigate("/home")
      }
      // if(!userData){
      //   navigate("/")
      // }
    } catch (error) {
      console.error("error in catch", error);
    }
  };


  const login = useGoogleLogin({
    onSuccess: GoogleLogin,
    onError: GoogleLogin,
    flow: "authcode",
  });

  return (
    <div>
      <button onClick={login}>login with google</button>
    </div>
  );
}

export default Login;