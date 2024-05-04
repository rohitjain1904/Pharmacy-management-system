import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const ViewUser = () => {
   const [users, setUsers] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const response = await axios.get('http://localhost:5000/api/customers');
            setUsers(response.data);
         } catch (error) {
            console.error('Error fetching users:', error);
         }
      };

      fetchUsers();
   }, []);

   const handleDelete = async (userID) => {
      try {
         await axios.delete(`http://localhost:5000/api/customer/${userID}`);
         setUsers((prevUsers) => prevUsers.filter((user) => user.userID !== userID));
      } catch (error) {
         console.error('Error deleting user:', error);
      }
   };

   const filteredUsers = users.filter((user) => {
      const fullName = `${user.name} ${user.email} ${user.mobileNumber} ${user.address}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
   });

   return (
      <>
         <div className="view-user-container">
            <div className="view-user-card">
               <h1 className="view-user-title">View Users</h1>
              
               <div className="container-input mb-3 mt-2 col-6">
                  <input
                    type="text"
                    placeholder="Search i.e name, mobile,email,address"
                    name="text"
                    className="input form-control"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="fas fa-search ps-2"></i>
                </div>
               <table className="view-user-table">
                  <thead>
                     <tr>
                        <th className='hover-effect'>User ID</th>
                        <th className='hover-effect'>Name</th>
                        <th className='hover-effect'>Email</th>
                        <th className='hover-effect'>Mobile Number</th>
                        <th className='hover-effect'>Address</th>
                        <th className='hover-effect'>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredUsers.map((user) => (
                        <tr key={user.userID}>
                           <td className='hover-effect'>{user.userID}</td>
                           <td className='hover-effect'>{user.name}</td>
                           <td className='hover-effect'>{user.email}</td>
                           <td className='hover-effect'>{user.mobileNumber}</td>
                           <td className='hover-effect'>{user.address}</td>
                           <td className='hover-effect'>
                              <button className="btn btn-danger " onClick={() => handleDelete(user.userID)}>Delete</button>
                              <NavLink className="btn btn-warning" to={`/UpdateUser/${user.userID}`}>Update</NavLink>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </>
   );
};

export default ViewUser;
