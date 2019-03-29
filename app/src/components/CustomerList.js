import React, {Component} from "react";
import axios from 'axios';

class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      accessToken: props.accessToken,
      permissions: props.permissions
    };
  }

  async componentDidMount() {
    if(this.state.permissions.includes("read:customers")) {
      const customers = (await axios.get('http://localhost:3001/customers', { headers: { 'Authorization': `Bearer ${this.state.accessToken}`}})).data;
      this.setState({
        customers,
      });
    }
  }

  render() {
    if(!this.state.permissions.includes("read:customers")) {
      return null;
    }
    return (
      <div>
        <h3>Customer List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.customers.map(customer => (
              <tr key={customer.user_id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.user_id}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default CustomerList;