import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
   
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem('token','')
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthorized')
    setIsLoggedIn(false);
    
    navigate('/login');
  };
  useEffect(()=>{
    const isAuthorized = localStorage.getItem('isAuthorized');
    if(isAuthorized){
        setIsLoggedIn(true);
    } else {
        setIsLoggedIn(false);
        
    }
  },[])

  return (
    <nav className="navbar navbar-expand-lg bg-warning" style={{ boxShadow: "0px 0px 25px 10px" }}>
      <div className="container-fluid">
        <img className="log1 mb-1 my-2" src="./images/pharma icon.png" alt="" width="60" />
        <NavLink className="navbar-brand fs-3 fst-italic" style={{ fontWeight: '500', color: 'orangered' }} to="/">Pharmacist</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mb-2" id="navbarNav">
          <ul className="navbar-nav p-2 me-auto mb-lg-0 d-flex flex-row">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink className="btn btn-secondary mx-1" to="/dashboard">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <button className="btn btn-secondary mx-1" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="btn btn-secondary mx-1" exact to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="btn btn-secondary mx-1" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="btn btn-secondary mx-1" to="/signup">Signup</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}