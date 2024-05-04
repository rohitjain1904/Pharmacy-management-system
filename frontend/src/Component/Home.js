import React from 'react';
import Footer from '../Component/Footer';

export default function Home() {
  return (
    <div>
      <div id="Content" className="slide">
        <div className="content-inner">
          {/* Background Image */}
          <div className="content-item active" style={{ backgroundImage: 'url("./images/pharmacy_store2.jpg")', backgroundSize: 'cover', height: '900px',width:'100%' }}>
            {/* Your content goes here */}
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

