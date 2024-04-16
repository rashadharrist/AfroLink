import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace 'http://localhost:5000' with your actual back-end server address
      const response = await axios.post('http://localhost:3000/api/login', credentials);
      console.log(response.data); // The token should be here
      // Save the token in localStorage or context and redirect as needed
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      // Handle errors, maybe set an error message in state and display it
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
