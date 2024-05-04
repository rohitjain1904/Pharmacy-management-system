import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const [nameError, setNameError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [addressError, setAddressError] = useState('');

  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const handleNameChange = (e) => {
    setName(e.target.value);
    nameValidator(e.target.value)
  };

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
    mobileNumberValidator(e.target.value)
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    emailValidator(e.target.value)
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    addressValidator(e.target.value)
  };

  const nameValidator = (name) => {
    if (!name.trim()) {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

  const mobileNumberValidator = (mobileNumber) => {
    if (!mobileNumber.trim()) {
      setMobileNumberError('Mobile Number is required');
    } else if (!/^\d+$/.test(mobileNumber)) {
      setMobileNumberError('Mobile Number should contain only numeric characters');
    } else if (!/^[789]\d{9}$/.test(mobileNumber)) {
      setMobileNumberError('Invalid Mobile Number. Should start with 9, 7, or 8 and have a total of 10 digits.');
    } else {
      setMobileNumberError('');
    }
  };

  const emailValidator = (email) => {
    if (!email.trim()) {
      setEmailError('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Email is invalid');
    } else {
      setEmailError('');
    }
  };

  const addressValidator = (address) => {
    if (!address.trim()) {
      setAddressError('Address is required');
    } else {
      setAddressError('');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation

    // Name validation: required and start with a capital letter
    if (!name.trim()) {
      setNameError('Name is required');
    }
    // Mobile Number validation: required and should contain only numeric characters
    if (!mobileNumber.trim()) {
      setMobileNumberError('Mobile Number is required');
    } 
    // Email validation: required and standard email validation
    if (!email.trim()) {
      setEmailError('Email is required');
    }


    if (!address.trim()) {
      setAddressError('Address is required');
    }

   
    const user = {
      name:name.charAt(0).toUpperCase(),
      mobileNumber,
      email,
      address
    }

    if (!nameError && !mobileNumberError && !emailError && !addressError && name && email && address && mobileNumber) {
      try {
        const response = await axios.post('http://localhost:5000/api/customer', user);

        if (response && response.status === 201) {
          setMessage('')
          navigate('/dashboard')
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setMessage(error.response.data.message)
        }
      }
    }
  };

  return (
    <div>
      <div style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/38/70/67/360_F_238706716_aKnllr4AbeSc0wXX7YnwCjYx3K2MvbFL.jpg")', backgroundSize: 'cover', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ maxWidth: '400px', width: '100%', padding: '20px', border: '1px solid gray', backdropFilter: 'blur(8px)', borderRadius: '10px', boxShadow: '0 0px 30px rgba(1, 1, 1, 1)' }}>
          <div className="d-flex justify-content-center">
            <h1 className="box1 text-dark ">Add User</h1>
          </div>

          <form onSubmit={handleSubmit} className='text-align-center'>
            <div className="mb-1">
              <label htmlFor="name" className="form-label fw-bold fs-5 text-dark">Name:</label>
              <input type="text" name="name" defaultValue={name} onChange={handleNameChange} className="form-control" id="name" />
              {nameError && <p className="text-danger">{nameError}</p>}
              {errors.name && <p className="text-danger">{errors.name}</p>}
            </div>

            <div className="mb-1">
              <label htmlFor="mobileNumber" className="form-label fw-bold fs-5 text-dark">Mobile Number:</label>
              <input type="number" name="mobileNumber" defaultValue={mobileNumber} onChange={handleMobileNumberChange} className="form-control" id="mobileNumber" />
              {errors.mobileNumber && <p className="text-danger">{errors.mobileNumber}</p>}
              {mobileNumberError && <p className="text-danger">{mobileNumberError}</p>}
              {message && <p className="text-danger">{message}</p>}
            </div>

            <div className="mb-1">
              <label htmlFor="email" className="form-label fw-bold fs-5 text-dark">Email:</label>
              <input type="text" name="email" defaultValue={email} onChange={handleEmailChange} className="form-control" id="email" />
              {emailError && <p className="text-danger">{emailError}</p>}
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>

            <div className="mb-1">
              <label htmlFor="address" className="form-label fw-bold text-dark fs-5">Address:</label>
              <input type="text" name="address" defaultValue={address} onChange={handleAddressChange} className="form-control" id="address" />
              {addressError && <p className="text-danger">{addressError}</p>}
              {errors.address && <p className="text-danger">{errors.address}</p>}
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary fw-bold w-50 mt-3">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
