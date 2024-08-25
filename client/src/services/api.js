import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getDonors = () => axios.get(`${API_URL}/donors`);
export const addDonor = (donorData) => axios.post(`${API_URL}/donors`, donorData);

export const getBloodRequests = () => axios.get(`${API_URL}/blood-requests`);
export const addBloodRequest = (requestData) => axios.post(`${API_URL}/blood-requests`, requestData);
