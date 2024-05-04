import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import './../invoice.css'; // Import the CSS file for styling

const Invoice = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { billItems, total, customer } = location.state;

    // Get current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    // Function to handle printing and saving invoice
    const handlePrintAndRedirect = async () => {
        try {
            const invoiceDate = currentDate
            // Make a POST request to your backend to save the invoice data
            await axios.post('http://localhost:5000/api/invoices', {
                invoiceDate,
                customer,
                billItems,
                total
            });
            
            // Print the invoice
            window.print();
            
            // Redirect to the dashboard after printing
            navigate('/dashboard');
        } catch (error) {
            console.error('Error saving invoice:', error);
        }
    };

    return (
        <div style={{backgroundImage:'url("https://images.unsplash.com/photo-1576063523519-6210121fb42d?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',backgroundSize:'cover', height:'1000px'}}>
        <div className="invoice-container" >
            
            <h2>Invoice</h2>
            <div className="invoice-date-time">
                <p><strong>Date:</strong> {currentDate}</p>
                <p><strong>Time:</strong> {currentTime}</p>
            </div>
            <div className="customer-details">
                <h3>Customer Details</h3>
                <p><strong>Name:</strong> {customer.name}</p>
                <p><strong>Mobile Number:</strong> {customer.mobileNumber}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Address:</strong> {customer.address}</p>
            </div>
            <div className="invoice-details">
                <h3>Invoice Details</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Medicine</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.medicine.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.medicine.pricePerUnit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p><strong>Total:</strong> {Invoice.total}</p>
            </div>
            <button className ='btn btn-success rounded'onClick={handlePrintAndRedirect}>Print Invoice</button>
        </div>
        </div>
        
    );
};

export default Invoice;
