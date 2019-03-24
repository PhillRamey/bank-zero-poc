import React, {Component} from "react";
import axios from 'axios';

class EmployeeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      accessToken: props.accessToken
    };
  }

  async componentDidMount() {
    const employees = (await axios.get('http://localhost:3001/employees', { headers: { 'Authorization': `Bearer ${this.state.accessToken}`}})).data;
    this.setState({
      employees,
    });
  }

  render() {
    return (
      <div>
        <h3>Employee List</h3>
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
            this.state.employees.map(employee => (
              <tr key={employee.user_id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.user_id}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default EmployeeList;