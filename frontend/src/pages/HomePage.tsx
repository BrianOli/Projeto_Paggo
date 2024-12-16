import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token');

        const response = await axios.get(`${process.env.REACT_APP_NEST_API}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(`Hello, ${response.data.name}`);
      } catch (error) {
        console.error('Authentication failed:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  return <h1>{message || 'Loading...'}</h1>;
};

export default HomePage;