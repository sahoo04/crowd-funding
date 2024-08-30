// src/components/Login.js
import React from "react";
import { auth, provider, signInWithPopup } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        navigate("/dashboard"); // Redirect to dashboard after successful login
      })
      .catch((error) => {
        console.error(error);
        alert("Google login failed.");
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
