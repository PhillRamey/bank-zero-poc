import React from "react";

function ErrorPanel(props) {
  if(props.message) {
    return (
      <div className="alert alert-danger">
          {props.message}
      </div>
    );
  }

  //If time allows, look into conditional rendering of the component itself instead of handling it like this.
  return <div className="d-none"></div>;
}

export default ErrorPanel;