// src/components/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState('');

  const { username, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('https://my-project-mubw.onrender.com', {
        username,
        email,
        password
      });

      // Save token to localStorage
      localStorage.setItem('token', res.data.token);

      // Redirect to Home or desired page
      navigate('/home');
    } catch (err) {
      setError(err.response.data.message || 'Something went wrong');
    }
  };

  return (
    <div className="signup-container" style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label>Username:</label>
          <input 
            type="text" 
            name="username" 
            value={username} 
            onChange={onChange} 
            required 
            className="form-control" 
          />
        </div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={email} 
            onChange={onChange} 
            required 
            className="form-control" 
          />
        </div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={password} 
            onChange={onChange} 
            required 
            className="form-control" 
          />
        </div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label>Confirm Password:</label>
          <input 
            type="password" 
            name="password2" 
            value={password2} 
            onChange={onChange} 
            required 
            className="form-control" 
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
