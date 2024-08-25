import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './bloodRequest.css';

const BloodRequest = () => {
  const [requesterName, setRequesterName] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [hospital, setHospital] = useState('');
  const [contact, setContact] = useState('');
  const [requests, setRequests] = useState([]);
  const [editingRequestId, setEditingRequestId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blood-requests');
        setRequests(response.data);
      } catch (err) {
        console.error('Error fetching blood requests:', err);
        setError('Failed to fetch blood requests.');
      }
    };
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = { requesterName, bloodType, quantity, hospital, contact };

    try {
      if (editingRequestId) {
        await axios.put(`http://localhost:5000/api/blood-requests/${editingRequestId}`, requestData);
        setSuccess('Blood request updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/blood-requests', requestData);
        setSuccess('Blood request added successfully!');
      }
      setError('');
      setEditingRequestId(null);
      setRequesterName('');
      setBloodType('');
      setQuantity('');
      setHospital('');
      setContact('');
      const response = await axios.get('http://localhost:5000/api/blood-requests');
      setRequests(response.data);
    } catch (err) {
      console.error('Error adding/updating blood request:', err);
      setError('Error adding/updating blood request');
      setSuccess('');
    }
  };

  const handleEdit = (request) => {
    setEditingRequestId(request._id);
    setRequesterName(request.requesterName);
    setBloodType(request.bloodType);
    setQuantity(request.quantity);
    setHospital(request.hospital);
    setContact(request.contact);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blood-requests/${id}`);
      setSuccess('Blood request deleted successfully!');
      setError('');
      const response = await axios.get('http://localhost:5000/api/blood-requests');
      setRequests(response.data);
    } catch (err) {
      console.error('Error deleting blood request:', err);
      setError('Error deleting blood request');
      setSuccess('');
    }
  };

  return (
    <div className="blood-request-container">
      <div className="blood-request-form">
        <h2>{editingRequestId ? 'Edit Blood Request' : 'Request Blood'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={requesterName}
            onChange={(e) => setRequesterName(e.target.value)}
            placeholder="Requester Name"
            required
          />
          <input
            type="text"
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            placeholder="Blood Type"
            required
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            required
          />
          <input
            type="text"
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
            placeholder="Hospital"
            required
          />
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact"
            required
          />
          <button type="submit">{editingRequestId ? 'Update Blood Request' : 'Request Blood'}</button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
      </div>
      <div className="blood-request-list">
        <h2>Blood Request List</h2>
        <table className="blood-request-table">
          <thead>
            <tr>
              <th>Requester Name</th>
              <th>Blood Type</th>
              <th>Quantity</th>
              <th>Hospital</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.requesterName}</td>
                <td>{request.bloodType}</td>
                <td>{request.quantity}</td>
                <td>{request.hospital}</td>
                <td>{request.contact}</td>
                <td>
                  <button onClick={() => handleEdit(request)}>Edit</button>
                  <button onClick={() => handleDelete(request._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodRequest;
