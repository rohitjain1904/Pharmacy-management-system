import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
const navigate = useNavigate()
  useEffect(() => {
  
    const isAuthorized = localStorage.getItem('isAuthorized')
    console.log(isAuthorized)
    if(isAuthorized){
      navigate('/dashboard')
    }else{
      navigate('/login')
    }
  },[])

  return (
    <div className="container-fluid" style={{ 
      backgroundImage: 'url("https://img.freepik.com/premium-vector/background-pattern-illustration-theme-medical_554445-1008.jpg?w=740")', 
      backgroundSize: 'cover', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '20px' 
    }}>    
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="container p-3 border mt-2 rounded p-5" style={{ 
            backdropFilter: 'blur(30px)', 
            boxShadow: '0 0px 30px rgba(1, 1, 1, 1)' 
          }}>
            <div className="row ">
              <div className="col-md-4 mb-3">
                <Link className="dashboard-item" to="/AddUser">
                  <div style={{ 
                    border: '2px solid rgba(255, 255, 255, 0.5)', 
                    backdropFilter: 'blur(20px)', 
                    borderRadius: '10px', 
                    padding: '20px', 
                    textAlign: 'center' 
                  }}>
                    <img src="./images/adduser.JPG" alt="Add User" style={{ width: '100%' }} />
                    <span style={{ color: 'black', display: 'block', marginTop: '10px' }}>Add User</span>
                  </div>
                </Link>
              </div>
              <div className="col-md-4 mb-3">
                <Link className="dashboard-item" to="/ViewUser">
                  <div style={{ 
                    border: '2px solid rgba(255, 255, 255, 0.5)', 
                    borderRadius: '10px', 
                    padding: '20px', 
                    textAlign: 'center', 
                    backdropFilter: 'blur(20px)' 
                  }}>
                    <img src="./images/viewuser.JPG" alt="View User" style={{ width: '100%' }} />
                    <span style={{ color: 'black', display: 'block', marginTop: '10px' }}>View Users</span>
                  </div>
                </Link>
              </div>
              <div className="col-md-4 mb-3">
                <Link className="dashboard-item" to="/AddMedicine">
                  <div style={{ 
                    border: '2px solid rgba(255, 255, 255, 0.5)', 
                    backdropFilter: 'blur(20px)', 
                    borderRadius: '10px', 
                    padding: '20px', 
                    textAlign: 'center' 
                  }}>
                    <img src="./images/addmedicine.JPG" alt="Add Medicine" style={{ width: '100%' }} />
                    <span style={{ color: 'black', display: 'block', marginTop: '10px' }}>Add Medicine</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3 mb-3">
                <Link className="dashboard-item" to="/ViewMedicine">
                  <div style={{ 
                    border: '2px solid rgba(255, 255, 255, 0.5)', 
                    backdropFilter: 'blur(20px)', 
                    borderRadius: '10px', 
                    padding: '20px', 
                    textAlign: 'center' 
                  }}>
                    <img src="./images/viewmedicine.JPG" alt="View Medicine" style={{ width: '100%' }} />
                    <span style={{ color: 'black', display: 'block', marginTop: '10px' }}>View Medicine</span>
                  </div>
                </Link>
              </div>
              <div className="col-md-4 mb-3">
                <Link className="dashboard-item" to="/SellMedicine">
                  <div style={{ 
                    border: '2px solid rgba(255, 255, 255, 0.5)', 
                    backdropFilter: 'blur(20px)', 
                    borderRadius: '10px', 
                    padding: '20px', 
                    textAlign: 'center' 
                  }}>
                    <img src="./images/sellmedicine.jpg" alt="Sell Medicine" style={{ width: '100%' }} />
                    <span style={{ color: 'black', display: 'block', marginTop: '10px' }}>Sell Medicine</span>
                  </div>
                </Link>
              </div>
              <div className="col-md-4 mb-3">
                <Link className="dashboard-item" to="/ViewInvoices">
                  <div style={{ 
                    border: '2px solid rgba(255, 255, 255, 0.5)', 
                    backdropFilter: 'blur(20px)', 
                    borderRadius: '10px', 
                    padding: '20px', 
                    textAlign: 'center' 
                  }}>
                    <img src="./images/viewinvoice.jpg" alt="Invoice" style={{ width: '100%' }} />
                    <span style={{ color: 'black', display: 'block', marginTop: '10px' }}>View Invoice</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
