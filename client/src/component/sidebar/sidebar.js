import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';

const Sidebar = ({ onSelect, selected }) => {
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="sidebar">
      
      <ul>
        <li
          onClick={() => onSelect('donor')}
          className={selected === 'donor' ? 'active' : ''}
        >
          Donor
        </li>
        <li
          onClick={() => onSelect('bloodRequest')}
          className={selected === 'bloodRequest' ? 'active' : ''}
        >
          Blood requests
        </li>
        
        <li
          onClick={handleLogout}
          className={selected === 'logout' ? 'active' : ''}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
