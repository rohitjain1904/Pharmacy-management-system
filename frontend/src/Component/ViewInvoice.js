import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './../invoice.css'; // Import the CSS file for styling

const Invoice = () => {
    const invoiceId = useParams();
    const [invoice, setInvoice] = useState(null);
    const navigate = useNavigate();
    console.log(invoiceId)
    useEffect(() => {
        const fetchInvoiceDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/invoices/${invoiceId.id}`);
                setInvoice(response.data);
            } catch (error) {
                console.error('Error fetching invoice details:', error);
            }
        };

        fetchInvoiceDetails();
    }, [invoiceId]);

    // Function to handle printing and saving invoice
    const handlePrintAndRedirect = () => {
        // Print the invoice
        window.print();
        
        // Redirect to the dashboard after printing
        navigate('/dashboard');
    };

    if (!invoice) {
        return <div>Loading...</div>;
    }

    return (
        <div className="invoice-container">
            <h2>Invoice</h2>
            <div className="invoice-date-time">
                <p><strong>Date:</strong> {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
                {/* Optionally, you can also display time if available */}
                {/* <p><strong>Time:</strong> {new Date(invoice.invoiceDate).toLocaleTimeString()}</p> */}
            </div>
            <div className="customer-details">
                <h3>Customer Details</h3>
                <p><strong>Name:</strong> {invoice.customer.name}</p>
                <p><strong>Mobile Number:</strong> {invoice.customer.mobileNumber}</p>
                <p><strong>Email:</strong> {invoice.customer.email}</p>
                <p><strong>Address:</strong> {invoice.customer.address}</p>
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
                        {invoice.billItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.medicine.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.medicine.pricePerUnit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p><strong>Total:</strong> {invoice.total}</p>
            </div>
            <button className = 'btn btn-success rounded' onClick={handlePrintAndRedirect}>Save and Print Invoice</button>
        </div>
    );
};

export default Invoice;
