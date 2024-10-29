
"use client"
import React from 'react';

const Popup: React.FC = () => {
 

  return (
    <div>
      <h1>Connect to Service</h1>
      <p>After you close this window, the service would be connected to your account</p>
      <button onClick={()=>window.close()}>Ok</button>
    </div>
  );
};

export default Popup;
