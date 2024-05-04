import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
   const { id } = useParams();
   const [user, setUser] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchUserDetails = async () => {
         try {
            const response = await axios.get(`http://localhost:5000/api/customer/${id}`);
            setUser(response.data);
         } catch (error) {
            console.error('Error fetching user details:', error);
         }
      };

      fetchUserDetails();
   }, [id]);

   const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
   };

   const handleUpdate = async (e) => {
      e.preventDefault()
      try {
         const response = await axios.put(`http://localhost:5000/api/customer/${id}`, user);
         if(response && response.status===200){
            navigate('/ViewUser'); // Use navigate function to navigate to ViewUser
         }
      } catch (error) {
         console.error('Error updating user:', error);
      }
   };

   if (!user) {
      return <div>Loading...</div>;
   }

   return (
      <div>
         <div style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/38/70/67/360_F_238706716_aKnllr4AbeSc0wXX7YnwCjYx3K2MvbFL.jpg")', backgroundSize: 'cover', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '20px', border: '1px solid gray', backdropFilter: 'blur(8px)', borderRadius: '10px', boxShadow: '0 0px 30px rgba(1, 1, 1, 1)' }}>
               <div className="d-flex justify-content-center">
                  <h1 className="box1 text-dark ">Update User</h1>
               </div>
               <form onSubmit={handleUpdate} className='text-align-center'>
                  <div className="mb-1">
                     <label htmlFor="name" className="form-label fw-bold fs-5 text-dark">Name:</label>
                     <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control" id="name" />
                  </div>

                  <div className="mb-1">
                     <label htmlFor="mobileNumber" className="form-label fw-bold fs-5 text-dark">Mobile Number:</label>
                     <input type="text" name="mobileNumber" value={user.mobileNumber} onChange={handleChange} className="form-control" id="mobileNumber" />
                  </div>

                  <div className="mb-1">
                     <label htmlFor="email" className="form-label fw-bold fs-5 text-dark">Email:</label>
                     <input type="text" name="email" value={user.email} onChange={handleChange} className="form-control" id="email" />
                  </div>

                  <div className="mb-1">
                     <label htmlFor="address" className="form-label fw-bold text-dark fs-5">Address:</label>
                     <input type="text" name="address" value={user.address} onChange={handleChange} className="form-control" id="address" />
                  </div>
                  <div className="d-flex justify-content-center">
                     <button type="submit" className="btn btn-primary fw-bold  w-50 mt-3">Update</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default UpdateUser;
