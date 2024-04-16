import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';




function Register() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      // Replace 'http://localhost:5000' with your actual back-end server address
      const response = await axios.post('http://localhost:3000/api/register', {
        email: userData.email,
        password: userData.password
      });
      console.log(response.data); // You'll get the token and maybe user data
      // Save the token in localStorage or context and redirect as needed
    }   catch (error) {
      console.error('Registration failed:', error.response.data.message);
      // Handle errors, maybe set an error message in state and display it
    }
};

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
