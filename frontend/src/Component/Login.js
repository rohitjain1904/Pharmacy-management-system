import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');
  const [showNoRecordPopup, setShowNoRecordPopup] = useState(false); // New state for popup
  const navigate = useNavigate(); // Use useNavigate hook

  const validateEmail = (email) => {
    // Basic email validation
    if (!email) {
      setEmailError('Email is Required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setEmailError('Enter a Valid Email');
    } else {
      setEmailError('');
    }
  };
  const validatePassword = (password) => {
    // Basic email validation
    if (!password) {
      setPasswordError('Password is Required');
    } else if (password.length < 3) {
      setPasswordError('Password must be at least 3 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Email is Required');
    }
    if (!password) {
      setPasswordError('Password is Required');
    }
    if (!emailError && !passwordError && email && password) {

      try {
        const response = await axios.post('http://localhost:5000/api/login', {
          email,
          password,
        });

        const { success, token } = response.data;
        if (success) {
          localStorage.setItem('token', token);
          localStorage.setItem('isAuthorized', true);
          setIsLoggedIn(true);
          toast.success('Successfully Login')
          navigate('/dashboard');
        } else {
          
          if (response.data.message === 'No records found') {
            setShowNoRecordPopup(true);
          } else {
            toast.error('Login failed. Please check your credentials.')
            setMessage('Login failed. Please check your credentials.');
          }
        }
      } catch (error) {
        console.error('Login error:', error);
        if (error.response && error.response.status === 401) {
          setMessage(error.response.data.message);
        } else {
          setMessage('An error occurred during login. Please try again later.');
        }
      }
    }
  };

  const closePopup = () => {
    setShowNoRecordPopup(false);
  };
  useEffect(() => {

    const isAuthorized = localStorage.getItem('isAuthorized')

    if (isAuthorized) {
      console.log(isAuthorized)
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }, [])

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-content">
          <h1 className="login-heading"> Login</h1>
          <form className="login-form">
            {message && <p className='error-message'>{message}</p>}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                defaultValue={email}
                onChange={handleEmailInput}
              />
              {emailError && <p className='error-message'>{emailError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                defaultValue={password}
                onChange={handlePasswordChange}
              />
              {passwordError && <p className='error-message'>{passwordError}</p>}
            </div>
            <button type="submit" className="btn btn-primary btn-block" onClick={handleLogin}>Login</button>

          </form>
          {/* <NavLink to='/signup' className="login-link">Don't have an account? Sign up here</NavLink> */}
          <a className='text-primary hover-pointer' onClick={() => navigate('/signup')}>Don't have an  account? Sign up here</a>
        </div>
      </div>

      {/* Popup for no records found */}
      {showNoRecordPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>No records found for the provided email and password.</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
