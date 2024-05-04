import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewMedicine = () => {
   const [medicines, setMedicines] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');

   useEffect(() => {
      const fetchMedicines = async () => {
         try {
            const response = await axios.get('http://localhost:5000/api/getMedicines');
            setMedicines(response.data);
         } catch (error) {
            console.error('Error fetching medicines:', error);
         }
      };

      fetchMedicines();
   }, []);

   const handleDelete = async (medicineId) => {
      try {
         await axios.delete(
            `http://localhost:5000/api/medicines/${medicineId}`);
         setMedicines((prevMedicines) => prevMedicines.filter((medicine) => medicine._id !== medicineId));
      } catch (error) {
         console.error('Error deleting medicine:', error);
      }
   };

   const formatExpiryDate = (expiryDate) => {
      const date = new Date(expiryDate);
      return date.toLocaleDateString(); // Get only the date part
   };

   const filteredMedicines = medicines.filter((medicine) => {
      const fullName = `${medicine.name} ${medicine.companyName} ${medicine.quantity} ${medicine.pricePerUnit} ${formatExpiryDate(medicine.expiryDate)}.toLowerCase()`;
      return fullName.includes(searchTerm.toLowerCase());
   });

   return (
      <div className="container pt-4 mt-5 bg-success">
         <div className="">
            <h1 className="view-medicine-title text-light">View Medicines</h1>
            <div className="mb-3">
               <input
                  type="text"
                  className="form-control"
                  placeholder="Search medicines i.e name, company, quantity, price, expire date"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <table className="">
               <thead>
                  <tr>
                     <th className="hover-effect">S.No</th>
                     <th className="hover-effect">Name</th>
                     <th className="hover-effect">Company Name</th>
                     <th className="hover-effect">Quantity</th>
                     <th className="hover-effect">Price Per Unit</th>
                     <th className="hover-effect">Expiry Date</th>
                     <th className="hover-effect">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredMedicines.map((medicine,index) => (
                     <tr key={index} className='text-light'>
                        <td>{index+1}</td>
                        <td>{medicine.name}</td>
                        <td>{medicine.companyName}</td>
                        <td>{medicine.quantity}</td>
                        <td>{medicine.pricePerUnit}</td>
                        <td>{formatExpiryDate(medicine.expiryDate)}</td>
                        <td>
                           <button className="btn btn-danger mx-1" onClick={() => handleDelete(medicine._id)}>Delete</button>
                           <Link className="btn" to={`/UpdateMedicine/${medicine._id}`}>
                              <button className='btn btn-warning'>Update</button>
                           </Link>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default ViewMedicine;