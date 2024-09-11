import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    id: '',
    name_ar: '',
    name_en: '',
    address_ar: '',
    address_en: '',
    mobile: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/student/update', data);
      console.log('Form submitted successfully', response);
      setData({
        id: '',
        name_ar: '',
        name_en: '',
        address_ar: '',
        address_en: '',
        mobile: ''
      });
    } catch (error) {
      console.error('There was an error submitting the form!', error);
      setError('There was an error submitting the form!');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/student/showid/${id}`);
      const studentData = response.data.data;
      setData(studentData);
    } catch (error) {
      console.error('Error fetching student:', error);
      setError('Error fetching student data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures fetchData is called only once

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Edit Student</h3>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                   <input
                    type="hidden"
                    name="id"
                    id="id"
                    value={data.id}
                    onChange={handleChange}
                  />
                  <div className="form-group">
                    <label htmlFor="name_en">Name</label>
                    <input
                      type="text" name="name_en" id="name_en" value={data.name_en}className="form-control" placeholder="Enter Name" onChange={handleChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name_ar">الأسم</label>
                    <input
                      type="text"
                      name="name_ar"
                      id="name_ar"
                      value={data.name_ar}
                      className="form-control"
                      placeholder="ادخل الاسم"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address_ar">العنوان</label>
                    <input
                      type="text"
                      name="address_ar"
                      className="form-control"
                      id="address_ar"
                      value={data.address_ar}
                      placeholder="ادخل العنوان"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address_en">Address</label>
                    <input
                      type="text"
                      name="address_en"
                      className="form-control"
                      id="address_en"
                      value={data.address_en}
                      placeholder="Enter Address"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      className="form-control"
                      id="mobile"
                      value={data.mobile}
                      placeholder="Enter Mobile"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Edit;
