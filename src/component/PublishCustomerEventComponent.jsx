import React, { useState } from 'react'
import axios from 'axios';

const CUTOMER_PUBLISH_EVENT_URL = 'http://localhost:9191/producer/app/publish/events';

const PublishCustomerEventComponent = () => {
    const initialFormData = {
      id: '',
      name: '',
      email: '',
      contactNo: '',
    };

const [formData, setFormData] = useState(initialFormData);
const [responseMessage, setResponseMessage] = useState(null);

const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(CUTOMER_PUBLISH_EVENT_URL, formData);
      setResponseMessage(response.data);
      console.log('Post request successful', response);
      setFormData(initialFormData);
      setTimeout(() => {
        setResponseMessage(null);
      }, 2000);
    } catch (error) {
        setResponseMessage('Unable to publish the customer event');
      console.error('Error making POST request', error);
    }
  };

  return (
    <div style={{ marginTop: '10px', marginLeft: '10px'}}>
      <h2>Publish Customer Event</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
        <label>
          Id
          <input
            type="number"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Contact No
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <button type="submit">Publish Event</button>
      </form>
      <br/>
      {responseMessage && (
        <div>
          <p style={{ color: 'red' }}>{responseMessage}</p>
        </div>
      )}
    </div>
  );
};

export default PublishCustomerEventComponent