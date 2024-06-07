import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      <div className="flex flex-col md:flex-row md:justify-around">
        <Link to="/admin/users" className="admin-link">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
            Manage Users
          </div>
        </Link>
        <Link to="/admin/doctors" className="admin-link mt-4 md:mt-0">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
            Manage Doctors
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
