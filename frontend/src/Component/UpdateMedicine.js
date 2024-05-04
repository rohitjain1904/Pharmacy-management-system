import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateMedicine = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState({
    medicineID: '',
    name: '',
    companyName: '',
    quantity: 0,
    pricePerUnit: 0,
    expiryDate: ''
  });
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/medicines/${id}`);
        setMedicine(response.data);
      } catch (error) {
        console.error('Error fetching medicine details:', error);
      }
    };

    fetchMedicineDetails();
  }, [id]);

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/medicines/${id}`, medicine);
      toast.success('successfully updated medicine')
      navigate('/ViewMedicine')
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  if (!medicine) {
    return <div>Loading...</div>;
  }

  // Convert expiryDate to format accepted by <input type="date" />
  const formattedExpiryDate = medicine.expiryDate ? new Date(medicine.expiryDate).toISOString().split('T')[0] : '';

  return (
    <div style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/38/70/67/360_F_238706716_aKnllr4AbeSc0wXX7YnwCjYx3K2MvbFL.jpg")', backgroundSize: 'cover', height: '110vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '20px', border: '1px solid gray', backdropFilter: 'blur(8px)', borderRadius: '10px', boxShadow: '0 0px 30px rgba(1, 1, 1, 1)' }}>
        <div className="d-flex justify-content-center">
          <h1 className="box1 text-dark">Update Medicine</h1>
        </div>
        <form onSubmit={handleSubmit} className='text-align-center'>
          <div className="mb-1">
            <label htmlFor="name" className="form-label  fs-5 text-dark"><b>Name:</b></label>
            <input type="text" name="name" value={medicine.name} onChange={handleChange} className="form-control" id="name" required />
          </div>
          <div className="mb-1">
            <label htmlFor="companyName" className="form-label  fs-5 text-dark"><b>Company Name:</b></label>
            <input type="text" name="companyName" value={medicine.companyName} onChange={handleChange} className="form-control" id="companyName" required />
          </div>
          <div className="mb-1">
            <label htmlFor="quantity" className="form-label  fs-5 text-dark"><b>Quantity:</b></label>
            <input type="number" name="quantity" value={medicine.quantity} onChange={handleChange} className="form-control" id="quantity" required />
          </div>
          <div className="mb-1">
            <label htmlFor="pricePerUnit" className="form-label  fs-5 text-dark"><b>Price Per Unit:</b></label>
            <input type="number" name="pricePerUnit" value={medicine.pricePerUnit} onChange={handleChange} className="form-control" id="pricePerUnit" required />
          </div>
          <div className="mb-1">
            <label htmlFor="expiryDate" className="form-label  fs-5 text-dark"><b>Expiry Date:</b></label>
            <input type="date" name="expiryDate" value={formattedExpiryDate} onChange={handleChange} className="form-control" id="expiryDate" required />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary  w-50 mt-3"><b>Update</b></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMedicine;
