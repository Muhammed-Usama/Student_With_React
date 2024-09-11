import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class Teachers extends Component {
  
  state = {
    teachers: [],
  };

  componentDidMount() {
    this.fetchTeachers();
  }

  fetchTeachers = () => {
    axios.get('http://127.0.0.1:8000/api/teacher/show')
      .then((result) => {
        this.setState({
          teachers: result.data.data,
        });
      })
      .catch((error) => {
        console.error('Error fetching Teachers:', error);
        // You may also want to update the state to reflect the error
      });
  };

  handleDelete = (id) => {
    axios.get(`http://127.0.0.1:8000/api/teacher/delete/${id}`)
      .then(() => {
        // Remove the deleted teacher from the state
        this.setState((prevState) => ({
          teachers: prevState.teachers.filter(teacher => teacher._id !== id),
        }));
      })
      .catch((error) => {
        console.error('Error deleting teacher:', error);
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
                          {this.state.teachers.map((teacher) => (
                            <tr key={teacher._id}>
                              <td>{teacher._id}</td>
                              <td>{teacher.name_en}</td>
                              <td>{teacher.address_en}</td>
                              <td>{teacher.mobile}</td>
                              <td>
                                <Link to={`/teacher/profile/${teacher._id}`} className="btn btn-success">
                                  <i className="fa-solid fa-eye"></i>
                                </Link>
                                <Link to={`/teacher/edit/${teacher._id}`} className="btn btn-primary">
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => this.handleDelete(teacher._id)}
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


export default Teachers;
