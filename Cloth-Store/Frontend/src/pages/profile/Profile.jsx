import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:8081/api/users/getuser', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          id: localStorage.getItem('id'),
        },
      });

      setProfile(response.data);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col sm:flex-row bg-gray-100">
      {/* Sidebar */}
      <div className="w-full sm:w-1/4 bg-white shadow-md p-4">
        <Sidebar datas={profile} />
      </div>

      {/* Main Content */}
      <div className="w-full sm:w-3/4 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
