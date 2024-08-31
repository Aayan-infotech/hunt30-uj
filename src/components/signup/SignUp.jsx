import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://35.167.209.94:8000/api/auth/signup', formData);
      console.log(response.data);
      navigate('/response');
    } catch (error) {
      console.error('There was an error signing up!', error);
    }
  };

  return (
    <div className="sign-up">
      <div className="container signup-container">
        <h1 className="sign-header">Sign Up</h1>
        <h4>Create Your Account to Get Started</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              name="name" 
              placeholder="What is your name? *" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              name="phone" 
              placeholder="What is your phone number?" 
              value={formData.phone} 
              onChange={handleChange} 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="What is your Email Id? *" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group"> 
            <input 
              type="text" 
              name="address" 
              placeholder="What is your Address? *" 
              value={formData.address} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="signup-button">
            Join Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
