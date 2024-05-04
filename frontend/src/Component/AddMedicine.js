import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddMedicine = () => {
  const [name,setName] = useState('');
  const [companyName,setCompanyName] = useState('');
  const [quantity,setQuantity] = useState('');
  const [pricePerUnit,setPricePerUnit] = useState('');
  const [expiryDate,setExpiryDate] = useState('');
  const currentDate = new Date().toISOString().split('T')[0];
  const [nameError, setNameError] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [pricePerUnitError, setPricePerUnitError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [message, setMessage] = useState('');
  const[errors,setErrors] = useState({});
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
    
    nameValidator(e.target.value);
  };

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
    
    companyNameValidator(e.target.value);
  };
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    
    quantityValidator(e.target.value);
  };
  const handlePricePerUnitChange = (e) => {
    setPricePerUnit(e.target.value);
    
    pricePerUnitValidator(e.target.value);
  };
  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
    
    expiryDateValidator(e.target.value);
  };

  const nameValidator = (name)=> {
    if (!name.trim()) {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

  const companyNameValidator = (companyName)=> {
    if (!companyName.trim()) {
      setCompanyNameError('Company Name is required');
    } else {
      setCompanyNameError('');
    }
  };

  const quantityValidator = (quantity)=> {
    if (!quantity.trim()) {
      setQuantityError('Quantity is required');
    } else if (parseFloat(quantity) <= 0 ) {
      setQuantityError('Quantity should be a positive number');
    }else {
      setQuantityError('');
    }
  };

  const pricePerUnitValidator = (pricePerUnit)=> {
    if (!pricePerUnit.trim()) {
      setPricePerUnitError('Price per unit is required');
    } else if (parseFloat(pricePerUnit) <= 0) {
      setPricePerUnitError('Price should be a positive number');
    }else {
      setPricePerUnitError('');
  }
};

  const expiryDateValidator = (expiryDate)=> {
    if (!expiryDate.trim()) {
      setExpiryDateError('Expiry Date is required');
    } else if (expiryDate < currentDate){
      setExpiryDateError('please enter the future date');
    }else {
      setExpiryDateError('');
  }
};
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0];

    if (!name.trim()) {
      setNameError('Name is Required' );
    }
    if (!companyName.trim()) {
      setCompanyNameError('Company Name is Required' );
    }
    if (!quantity.trim()) {
      setQuantityError('Quantity is Required' );
    }
    if (!pricePerUnit.trim()) {
      setPricePerUnitError('Price is Required');
    }
    if (!expiryDate.trim()) {
      setExpiryDateError('Expire Date is Required');
    } 

    const medicine = {
      name,
      companyName,
      quantity,
      pricePerUnit,
      expiryDate
    }
    

    if (!nameError && !companyNameError && !quantityError && !pricePerUnitError && !expiryDateError && name && companyName && quantity && pricePerUnit && expiryDate ) {
      try {
        
        const response = await axios.post('http://localhost:5000/api/medicine', medicine);
        if (response && response.status === 201) {
          setMessage('Successfully Added Medicine')
          navigate('/dashboard');
        }

      } catch (error) {
        
        if (error.response && error.response.status === 403) {
          setMessage(error.response.data.message);
          
        }
      }
    }
  };

  return (
    <div style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/38/70/67/360_F_238706716_aKnllr4AbeSc0wXX7YnwCjYx3K2MvbFL.jpg")', backgroundSize: 'cover', height: '110vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '400px', width: '550%', padding: '20px', border: '1px solid gray', backdropFilter: 'blur(8px)', borderRadius: '10px', boxShadow: '0 0px 30px rgba(1, 1, 1, 1)' }}>
        <div className="d-flex justify-content-center">
          <h1 className="box1 text-dark">Add Medicines</h1>
        </div>
        <form onSubmit={handleSubmit} className='text-align-center'>
          
          <div className="mb-1">
            <label htmlFor="name" className="form-label fs-5 text-dark"><b>Name:</b></label>
            <input type="text" name="name" defaultValue={name} onChange={handleNameChange} className="form-control" id="name" />
            {nameError && <p className="text-danger">{nameError}</p>}
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </div>

          <div className="mb-1">
            <label htmlFor="companyName" className="form-label fs-5 text-dark"><b>Company Name:</b></label>
            <input type="text" name="companyName" defaultValue={companyName} onChange={handleCompanyNameChange} className="form-control" id="companyName" />
            {companyNameError && <p className="text-danger">{companyNameError}</p>}
            {errors.companyName && <p className="text-danger">{errors.companyName}</p>}
            {message && <p className='text-danger'>{message}</p>}
          </div>

          <div className="mb-1">
            <label htmlFor="quantity" className="form-label fs-5 text-dark"><b>Quantity:</b></label>
            <input type="number" name="quantity" defaultValue={quantity} onChange={handleQuantityChange} className="form-control" id="quantity" />
            {quantityError && <p className="text-danger">{quantityError}</p>}             
            {errors.quantity && <p className="text-danger">{errors.quantity}</p>}
          </div>

          <div className="mb-1">
            <label htmlFor="pricePerUnit" className="form-label fs-5 text-dark"><b>Price Per Unit:</b></label>
            <input type="number" name="pricePerUnit" defaultValue={pricePerUnit} onChange={handlePricePerUnitChange} className="form-control" id="pricePerUnit" />
            {pricePerUnitError && <p className="text-danger">{pricePerUnitError}</p>}
            {errors.pricePerUnit && <p className="text-danger">{errors.pricePerUnit}</p>}
          </div>

          <div className="mb-1">
            <label htmlFor="expiryDate" className="form-label fs-5 text-dark"><b>Expiry Date:</b></label>
            <input type="date" name="expiryDate" defaultValue={expiryDate} onChange={handleExpiryDateChange} className="form-control" id="expiryDate" />
            {expiryDateError && <p className="text-danger">{expiryDateError}</p>}
            {errors.expiryDate && <p className="text-danger">{errors.expiryDate}</p>}
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-50 mt-3"><b>Save</b></button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default AddMedicine;
