import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
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
    <div className="login-container" style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
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
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
