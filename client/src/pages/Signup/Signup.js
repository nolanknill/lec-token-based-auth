import React from 'react';
import Input from "../../components/Input/Input";
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Signup.scss';

const Signup = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/api/users/register", {
          email: event.target.email.value,
          password: event.target.password.value,
          name: event.target.name.value,
          phone: event.target.phone.value,
          address: event.target.address.value,
      })
      .then(() => {
        setSuccess(true)
        event.target.reset();
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }

  return (
    <main className="signup-page">
        <form className="signup" onSubmit={handleSubmit}>
            <h1 className="signup__title">Sign up</h1>

            <Input type="text" name="name" label="Name" />
            <Input type="text" name="phone" label="Phone" />
            <Input type="text" name="address" label="Address" />
            <Input type="text" name="email" label="Email" />
            <Input type="password" name="password" label="Password" />

            <button className="signup__button">Sign up</button>

            {success && <div className="signup__message">Signed up!</div>}
            {error && <div className="signup__message">{error}</div>}
        </form>
        <p>
            Have an account? <Link to="/login">Log in</Link>
        </p>
    </main>
  );
};

export default Signup;