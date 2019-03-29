import React from "react";

import NoAccessPanel from "../components/NoAccessPanel.js";
import CustomerList from "../components/CustomerList.js";
import EmployeeList from "../components/EmployeeList.js";

function DashboardContent(props) {
  const permissions = props.permissions;
  const accessToken = props.accessToken;

  return (
    <div className="container">
      <h1>Dashboard<br/>
      <small className="text-muted">Welcome to your Bank Zero account.</small>
      </h1>
      <NoAccessPanel key='noaccess' permissions={permissions} />
      <CustomerList key='customerList' permissions={permissions} accessToken={accessToken} />
      <EmployeeList key='employeeList' permissions={permissions} accessToken={accessToken} />
    </div>
  );
}

export default DashboardContent;