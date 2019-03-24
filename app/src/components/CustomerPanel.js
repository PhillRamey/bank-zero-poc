import React from 'react';
import Logout from "../components/Logout";

function CustomerPanel(props) {
  if(props.permissions.includes("read:customers")) {
    return (
      <div className="d-none"></div>
    );
  }
  
  return (
    <div className="alert alert-info">
      <p>Thanks for your enthusiasm, but this app isn't ready for customers yet. We'll be sure to let you know once it is ready.</p>
      <Logout/>
    </div>
  );
}

export default CustomerPanel;