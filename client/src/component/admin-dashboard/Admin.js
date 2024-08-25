import { useState } from 'react';

import Sidebar from '../sidebar/sidebar';

import Donor from '../donor/Donor';
import BloodRequest from '../bloodRequest/bloodRequest';

const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('events');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'donor':
        return <Donor/>;
      case 'bloodRequest':
        return <BloodRequest/>;

      default:
        return <div>Please select a component from the sidebar.</div>;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar onSelect={setSelectedComponent} selected={selectedComponent} />
      <div className="content">
        
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
