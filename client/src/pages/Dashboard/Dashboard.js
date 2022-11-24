import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.scss';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

  const authToken = sessionStorage.getItem('authToken');

  // if there is no auth token in session storage auth is failed
  useEffect(() => {
    if (!authToken) {
      setFailedAuth(true);
    }
  }, [authToken]);

  // if there is an error from the endpoint (ie: token invalid, expired, tampered with)
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/users/current', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setFailedAuth(false);
      })
      .catch(() => {
        setFailedAuth(true);
      })
  }, [authToken]);

  const handleLogout = () => {
    // failedAuth = true
    setFailedAuth(true);

    // set user to null
    setUser(null);

    // remove token from session storage
    sessionStorage.removeItem('authToken');
  }

  if (failedAuth) {
    return (
      <main className="dashboard">
        <p>
          You must be logged in to see this page.{' '}
          <Link to="/login">Log in</Link>
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="dashboard">
        <p>... Loading ...</p>
      </main>
    )
  }

  const { name, email, phone, address } = user;

  return (
    <main className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>
      <p>
        Welcome back, {name}! 👋
      </p>
      <h2>My Profile</h2>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Address: {address}</p>

      <button className="dashboard__logout" onClick={handleLogout}>
        Log out
      </button>
    </main>
  )
};

export default Dashboard;