import React, { useState } from 'react';
import axios from 'axios';

const Add = () => {
  const [data, setData] = useState({
    name_ar: '',
    name_en: '',
    address_ar: '',
    address_en: '',
    mobile: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Basic validation
    if (!data.name_en || !data.mobile) {
      setError('Please fill in all required fields.');
      return;
    }

    axios.post('http://127.0.0.1:8000/api/student/add', data)
      .then(response => {
        setSuccessMessage('Form submitted successfully!');
        setData({
          name_ar: '',
          name_en: '',
          address_ar: '',
          address_en: '',
          mobile: ''
        });
      })
      .catch(error => {
        setError('There was an error submitting the form!');
        console.error('Submission error:', error);
      });
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Add Student</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  {error && <div className="alert alert-danger">{error}</div>}
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}

                  <div className="form-group">
                    <label htmlFor="name_en">Name</label>
                    <input 
                      type="text" 
                      name="name_en" 
                      id="name_en" 
                      value={data.name_en} 
                      className="form-control"
                      placeholder="Enter Name" 
                      onChange={handleChange} 
                    />
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
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Add;
