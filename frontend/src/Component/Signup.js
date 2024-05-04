import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [errors, setErrors] = useState('');

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const nameValidator = (name) => {
    if (!name.trim()) {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

  const validateEmail = (email) => {
    // Basic email validation
    if (!email) {
      setEmailError('Email is required.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setEmailError('Enter a valid email.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password) => {
    // Basic password validation
    if (!password) {
      setPasswordError('Password is required.');
    } else if (password.length < 3 || password.length > 9) {
      setPasswordError('Password must be between 3 and 9 characters and include both letters and numbers.',
      );
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required.');
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleNameInput = (e) => {
    setMessage('')
    setUsername(e.target.value);
    nameValidator(e.target.value);
  };

  const handleEmailInput = (e) => {
    setMessage('')
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setMessage('')
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setMessage('')
    setConfirmPassword(e.target.value);
    validateConfirmPassword(e.target.value);
  };


  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setNameError('Name is required');
    }
    // Mobile Number validation: required and should contain only numeric characters
    if (!email.trim()) {
      setEmailError('Email is required');
    }
    // Email validation: required and standard email validation
    if (!password.trim()) {
      setPasswordError('Password is required');
    }


    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Confirm Password is required');
    }

    if (!nameError && !emailError && !passwordError && !confirmPasswordError && username && email && password && confirmPassword) {
      try {
        const response = await axios.post('http://localhost:5000/api/signup', {
          username,
          email,
          password,
        });

        if (response.status === 201) {
          setMessage('User created successfully. Please login.');
          toast.success('User created successfully. Please login.')

          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          navigate('/login');
        } else {
          setMessage('Signup failed. Please try again.');
        }
      } catch (error) {
        toast.error('User Not Created')
        console.error('Signup error:', error);
        if (error.response && error.response.status === 400) {
          setMessage(error.response.data.message);
        } else {
          setMessage('An error occurred during signup. Please try again later.');
        }
      }
    }
  };
  useEffect(() => {

    const isAuthorized = localStorage.getItem('isAuthorized')

    if (isAuthorized) {
      console.log(isAuthorized)
      navigate('/dashboard')
    } else {
      navigate('/signup')
    }
  }, [])

  return (
    <div className="signup-container">
      <div></div>

      <div className="signup-box">
        <div className="signup-box-styling">
          <h1 className="h1">Sign Up</h1>
          <form className="form1" onSubmit={handleSignup}>
            {message && <p className='text-danger'>{message}</p>}
            <div className="mb-3">
              <label htmlFor="Name" className="form-text" style={{ display: 'inline' }}>
                User Name:
              </label>
              <input
                type="text"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                id="Name"
                aria-describedby="nameHelp"
                onChange={handleNameInput}
              />
              {nameError && <p className='error-message'>{nameError}</p>}
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-text" style={{ display: 'inline' }}>
                Email:
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handleEmailInput}
              />
              {emailError && <p className='error-message'>{emailError}</p>}
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-text" style={{ display: 'inline' }}>
                Password:
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="exampleInputPassword1"
                onChange={handlePasswordChange}
              />
              {passwordError && <p className='error-message'>{passwordError}</p>}
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputAddress" className="form-text" style={{ display: 'inline' }}>
                Confirm Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                id="exampleInputAddress"
                aria-describedby="addressHelp"
                onChange={handleConfirmPasswordChange}
              />
              {confirmPasswordError && <p className='error-message'>{confirmPasswordError}</p>}
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}