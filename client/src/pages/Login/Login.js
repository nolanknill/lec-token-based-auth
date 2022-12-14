import React from 'react';
import { useState } from 'react';
import { Navigate, Link } from "react-router-dom";
import axios from 'axios';
import Input from '../../components/Input/Input';
import './Login.scss';

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/api/users/login", {
          email: event.target.email.value,
          password: event.target.password.value,
      })
      .then((res) => {
        console.log('Login Response:', res.data);
        sessionStorage.setItem("authToken", res.data.token);
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  return (
    <main className="login-page">
        <form className="login" onSubmit={handleSubmit}>
            <h1 className="login__title">Log in</h1>

            <Input type="text" name="email" label="Email" />
            <Input type="password" name="password" label="Password" />

            <button className="login__button">Log in</button>

            {error && <div className="login__message">{error}</div>}
            {success && <Navigate to="/" />}
        </form>
        <p>
            Need an account? <Link to="/signup">Sign up</Link>
        </p>
    </main>
  );
};

export default Login;