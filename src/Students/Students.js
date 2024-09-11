import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class Students extends Component {
  
  state = {
    students: [],
  };

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    axios.get('http://127.0.0.1:8000/api/student/show')
      .then((result) => {
        this.setState({
          students: result.data.data,
        });
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        // You may also want to update the state to reflect the error
      });
  };

  handleDelete = (id) => {
    axios.get(`http://127.0.0.1:8000/api/student/delete/${id}`)
      .then(() => {
        // Remove the deleted student from the state
        this.setState((prevState) => ({
          students: prevState.students.filter(student => student._id !== id),
        }));
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
        // Optionally, handle the error state here
      });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>DataTables</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                    <li className="breadcrumb-item active">DataTables</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header"></div>
                    <div className="card-body">
                      <table id="example2" className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Mobile</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.students.map((student) => (
                            <tr key={student._id}>
                              <td>{student._id}</td>
                              <td>{student.name_en}</td>
                              <td>{student.address_en}</td>
                              <td>{student.mobile}</td>
                              <td>
                                <Link to={`/student/profile/${student._id}`} className="btn btn-success">
                                  <i className="fa-solid fa-eye"></i>
                                </Link>
                                <Link to={`/student/edit/${student._id}`} className="btn btn-primary">
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => this.handleDelete(student._id)}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}


export default Students;
