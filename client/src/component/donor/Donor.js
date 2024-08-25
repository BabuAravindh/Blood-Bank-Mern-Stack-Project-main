import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './donor.css';

const Donor = () => {
  const [name, setName] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [donors, setDonors] = useState([]);
  const [editingDonorId, setEditingDonorId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/donors');
        setDonors(response.data);
      } catch (err) {
        console.error('Error fetching donors:', err);
        setError('Failed to fetch donors.');
      }
    };
    fetchDonors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donorData = { name, bloodType, age, contact };

    try {
      if (editingDonorId) {
        await axios.put(`http://localhost:5000/api/donors/${editingDonorId}`, donorData);
        setSuccess('Donor updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/donors', donorData);
        setSuccess('Donor added successfully!');
      }
      setError('');
      setEditingDonorId(null);
      setName('');
      setBloodType('');
      setAge('');
      setContact('');
      const response = await axios.get('http://localhost:5000/api/donors');
      setDonors(response.data);
    } catch (err) {
      console.error('Error adding/updating donor:', err);
      setError('Error adding/updating donor');
      setSuccess('');
    }
  };

  const handleEdit = (donor) => {
    setEditingDonorId(donor._id);
    setName(donor.name);
    setBloodType(donor.bloodType);
    setAge(donor.age);
    setContact(donor.contact);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/donors/${id}`);
      setSuccess('Donor deleted successfully!');
      setError('');
      const response = await axios.get('http://localhost:5000/api/donors');
      setDonors(response.data);
    } catch (err) {
      console.error('Error deleting donor:', err);
      setError('Error deleting donor');
      setSuccess('');
    }
  };

  return (
    <div className="donor-container">
      <div className="donor-form">
        <h2>{editingDonorId ? 'Edit Donor' : 'Add Donor'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
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
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            required
          />
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact"
            required
          />
          <button type="submit">{editingDonorId ? 'Update Donor' : 'Add Donor'}</button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
      </div>
      <div className="donor-list">
        <h2>Donor List</h2>
        <table className="donor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Blood Type</th>
              <th>Age</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor._id}>
                <td>{donor.name}</td>
                <td>{donor.bloodType}</td>
                <td>{donor.age}</td>
                <td>{donor.contact}</td>
                <td>
                  <button onClick={() => handleEdit(donor)}>Edit</button>
                  <button onClick={() => handleDelete(donor._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donor;
