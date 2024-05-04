import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewInvoices = () => {
   const [invoices, setInvoices] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');

   useEffect(() => {
      const fetchInvoices = async () => {
         try {
            const response = await axios.get('http://localhost:5000/api/invoices');
            setInvoices(response.data);
         } catch (error) {
            console.error('Error fetching invoices:', error);
         }
      };

      fetchInvoices();
   }, []);

   const handleDelete = async (invoiceId) => {
      try {
         await axios.delete(`http://localhost:5000/api/invoice/${invoiceId}`);
         setInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice._id !== invoiceId));
      } catch (error) {
         console.error('Error deleting invoice:', error);
      }
   };

   const formatInvoiceDate = (invoiceDate) => {
      const date = new Date(invoiceDate);
      return date.toLocaleDateString(); // Get only the date part
   };

   const filteredInvoices = invoices.filter((invoice) => {
      const fullName = `${invoice.customerName} ${invoice.total} ${formatInvoiceDate(invoice.invoiceDate)}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
   });

   return (
    
      <div className="view-invoices-container">
         <div className="view-invoices-card">
            <h1 className="view-invoices-title text-">View Invoices</h1>
            <div className="mb-3">
               <input
                  type="text"
                  className="form-control"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <table className="view-invoices-table">
               <thead>
                  <tr>
                     <th className="hover-effect">Invoice ID</th>
                     <th className="hover-effect">Customer Name</th>
                     <th className="hover-effect">Total</th>
                     <th className="hover-effect">Invoice Date</th>
                     <th className="hover-effect">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredInvoices.map((invoice) => (
                     <tr key={invoice.invoiceID}>
                        <td>{invoice.invoiceNumber}</td>
                        <td>{invoice.customer.name}</td>
                        <td>{invoice.total}</td>
                        <td>{formatInvoiceDate(invoice.invoiceDate)}</td>
                        <td>
                           <button className="btn btn-danger" onClick={() => handleDelete(invoice._id)}>Delete</button>
                           <Link className="btn" to={`/viewInvoice/${invoice.invoiceNumber}`}>
                              <button className='btn btn-info'>View</button>
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

export default ViewInvoices;
