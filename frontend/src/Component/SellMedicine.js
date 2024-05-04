import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellMedicine = () => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [billItems, setBillItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [customerSuggestions, setCustomerSuggestions] = useState([]);
    const [medicineSuggestions, setMedicineSuggestions] = useState([]);
    const [customerInput, setCustomerInput] = useState('');
    const [medicineInput, setMedicineInput] = useState('');
    const [medicines, setMedicines] = useState([]);
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [isExpired, setIsExpired] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCustomers();
        fetchMedicines();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const fetchMedicines = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/getMedicines');
            setMedicines(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    };

    useEffect(() => {
        setCustomerSuggestions(customers);
        setMedicineSuggestions(medicines);
    }, [customers, medicines]);



    const handleAddToBill = () => {
        if (!customerInput || !medicineInput) {
            alert('Please select a customer and a medicine.');
            return;
        }

        if (!quantity || parseInt(quantity) <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }

        const selectedQuantity = parseInt(quantity);

        if (availableQuantity < quantity) {
            alert('Quantity exceeds available stock.');
            return;
        }

        const existingItem = billItems.find(item => item.medicine.name === selectedMedicine.name);
        if (existingItem) {
            const updatedBillItems = billItems.map(item => {
                if (item.medicine.name === selectedMedicine.name) {
                    return { ...item, quantity: item.quantity + selectedQuantity };
                }
                return item;
            });
            setBillItems(updatedBillItems);
        } else {
            const newItem = {
                medicine: selectedMedicine,
                quantity: selectedQuantity,
            };
            setBillItems([...billItems, newItem]);
        }

        setAvailableQuantity(availableQuantity - selectedQuantity); // Reduce available quantity
        setTotal(total + selectedMedicine.pricePerUnit * selectedQuantity);
        //setQuantity('');
    };


    const handleRemoveFromBill = (itemToRemove) => {
        const updatedBillItems = billItems.filter(item => item !== itemToRemove);
        setBillItems(updatedBillItems);

        const updatedMedicine = medicines.find(medicine => medicine.id === itemToRemove.medicine.id);
        if (updatedMedicine) {
            const updatedQuantity = updatedMedicine.quantity + itemToRemove.quantity;
            const updatedMedicines = medicines.map(medicine => {
                if (medicine.id === updatedMedicine.id) {
                    return { ...medicine, quantity: updatedQuantity };
                }
                return medicine;
            });
            setMedicines(updatedMedicines);
        }

        const removedTotal = itemToRemove.medicine.pricePerUnit * itemToRemove.quantity;
        const remainingTotal = total - removedTotal;
        setTotal(remainingTotal);
    };

    const handleFinalizeSell = async () => {
        try {
            // Reduce the quantity of purchased medicines in the database
            await Promise.all(
                billItems.map(async (item) => {
                    const updatedQuantity = item.medicine.quantity - item.quantity;
                    await axios.put(`http://localhost:5000/api/medicines/${item.medicine._id}`, {
                        ...item.medicine,
                        quantity: updatedQuantity,
                    });
                })
            );

            // Navigate to the invoice page
            navigate('/invoice', {
                state: {
                    billItems: billItems,
                    total: total,
                    customer: selectedCustomer,
                }
            });
        } catch (error) {
            console.error('Error finalizing sell:', error);
        }
    };

    const filterCustomers = (searchTerm) => {
        return customers.filter(customer => customer.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const filterMedicines = (searchTerm) => {
        return medicines.filter(medicine => medicine.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const isFinalizeDisabled = billItems.length === 0;

    useEffect(() => {
        if (selectedMedicine) {
            const isExpire = new Date(selectedMedicine.expiryDate) < new Date();
            if (isExpire) {
                setIsExpired(true);
                setQuantity('');
                
            } else {
                setIsExpired(false);
            }
        }
    }, [selectedMedicine]);

    return (
        <>
            <div>
                <div style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1573883430697-4c3479aae6b9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', backgroundSize: 'cover', height: 'auto', padding: '20px' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Sell Medicine</h1>
                    <div style={{ backdropFilter: 'blur(10px)', padding: '40px', border: '1px solid grey', borderRadius: '10px', boxShadow: '0 0px 30px rgba(1, 1, 1, 1)', width: '50%', margin: '0 auto' }}>
                        <div>
                            <label className='fs-5'><b>Customer Name:</b></label>
                            <input
                                className='form-control  mb-2'
                                type="text"
                                value={customerInput}
                                onChange={(e) => {
                                    setCustomerInput(e.target.value);
                                    setCustomerSuggestions(filterCustomers(e.target.value));
                                }}
                            />
                            <select
                                value={selectedCustomer ? selectedCustomer.name : ''}
                                onChange={(e) => {
                                    const selectedCustomer = customers.find(customer => customer.name === e.target.value);
                                    setCustomerInput(selectedCustomer.name)
                                    setSelectedCustomer(selectedCustomer);
                                }}
                            >
                                <option value="">Select a customer</option>
                                {customerSuggestions.map((customer) => (
                                    <option key={customer._id} value={customer.name}>
                                        {customer.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <hr />
                        <div>
                            <label className='fs-5'><b>Medicine Name:</b></label>
                            <input
                                className=' form-control mb-2'
                                type="text"
                                value={medicineInput}
                                onChange={(e) => {
                                    setMedicineInput(e.target.value);
                                    setMedicineSuggestions(filterMedicines(e.target.value));
                                }}
                            />
                            <select
                                value={selectedMedicine ? selectedMedicine.name : ''}
                                onChange={(e) => {
                                    const selectedMedicineName = e.target.value;
                                    const selectedMedicine = medicines.find((medicine) => medicine.name === selectedMedicineName);
                                    setMedicineInput(selectedMedicine.name);
                                    setAvailableQuantity(selectedMedicine.quantity)
                                    setSelectedMedicine(selectedMedicine)
                                }}
                            >

                                <option value="">Select a medicine</option>
                                {medicineSuggestions.map((medicine) => (
                                    <option key={medicine._id} value={medicine.name}>
                                        {medicine.name}
                                    </option>
                                ))}
                            </select>

                            {
                                isExpired && <p className='error-message'>This Medicine Has Expired</p>
                            }
                            {availableQuantity && <p className='error'>Available Quantity: {availableQuantity}</p>}
                            <hr />
                            <label className='fs-5'><b>Quantity:</b></label>
                            <input
                                className='form-control mb-2'
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                disabled={!availableQuantity}
                            />
                            <button
                                className='btn bg-white mx-2'
                                onClick={handleAddToBill}
                                disabled={!quantity}
                                style={{ marginLeft: '10px' }}
                            >
                                Add to Bill
                            </button>
                        </div>
                        <hr />
                        <div style={{ marginTop: '20px' }}>
                            <h3>Bill Items</h3>
                            <ul>
                                {billItems.map((item, index) => (
                                    <li key={index}>
                                        {item.medicine.name} - Quantity: {item.quantity}
                                        <button onClick={() => handleRemoveFromBill(item)}>X</button>
                                    </li>
                                ))}
                            </ul>
                            <p className='fs-5 fw-bold'>Total: {total}</p>
                            <button
                                className='btn bg-white border fw-bold'
                                onClick={handleFinalizeSell}
                                disabled={isFinalizeDisabled}
                            >
                                Finalize Sell
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SellMedicine;