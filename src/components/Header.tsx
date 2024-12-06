import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, PieChart, FileBarChart, LogOut } from 'lucide-react';

export const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/dashboard" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
              <LayoutDashboard className="w-5 h-5 mr-2" />
              Dashboard
            </Link>
            <Link to="/summary" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
              <PieChart className="w-5 h-5 mr-2" />
              Summary
            </Link>
            <Link to="/reports" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
              <FileBarChart className="w-5 h-5 mr-2" />
              Reports
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};