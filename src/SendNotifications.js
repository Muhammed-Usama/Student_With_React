import React, { useState, useEffect } from "react";
import axios from 'axios';

function SendNotifications() {
  const [tokens, setTokens] = useState([]); // State for storing tokens
  const [selectedToken, setSelectedToken] = useState(''); // State for selected token
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [data, setData] = useState({
    token: '',
    title: '',
    body: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleTokenChange = (e) => {
    setSelectedToken(e.target.value);
    setData({ ...data, token: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/sendnotification', data);
      setSuccessMessage('Notification submitted successfully!');
      console.log('Notification submitted successfully', response);
      setData({
        token: '',
        title: '',
        body: '',
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
      const response = await axios.get('http://127.0.0.1:8000/api/tokens');
      const tokensArray = response.data.Tokens; // Array of token objects

      if (Array.isArray(tokensArray) && tokensArray.length > 0) {
        setTokens(tokensArray); // Set the tokens for the dropdown
      } else {
        setError('No tokens found');
      }
    } catch (error) {
      console.error('Error fetching tokens:', error);
      setError('Error fetching token data');
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
                <h3 className="card-title">Send Notification</h3>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>

                  <div className="card-body">
                  {error && <div className="alert alert-danger">{error}</div>}
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}
                </div>
                <div className="card-body">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Select User</label>
                      <select className="form-control" value={selectedToken} onChange={handleTokenChange}>
                        <option value="">Select a token</option>
                        {tokens.map(token => (
                          <option key={token._id} value={token.device_token}>
                            {token.device_token}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="form-control"
                      placeholder="Title of Notification"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="body">Description</label>
                    <input
                      type="text"
                      name="body"
                      className="form-control"
                      id="body"
                      placeholder="Description of Notification"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SendNotifications;
