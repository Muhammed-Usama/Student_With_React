import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function AvgTeachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/teacher/avg_grades'); // Update the API endpoint as needed
        setTeachers(response.data.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>DataTables</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/admin/dashboard">Home</Link>
                </li>
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
                        <th>Name</th>
                        <th>Course</th>
                        <th>AVG Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.map((teacher) => (
                        <tr key={teacher.id}>
                          <td>{teacher.teacher_name}</td>
                          <td>{teacher.course_name}</td>
                          <td>{teacher.average_grade}</td>
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
  );
}

export default AvgTeachers;
