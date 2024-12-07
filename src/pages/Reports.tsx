import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';

import axios from 'axios';

export const Reports = () => {
  const [data, setData] = useState([]);
  const chartUrl = 'http://209.38.144.184:3000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        axios.get(`${chartUrl}/report-data`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          setData(response.data);
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Metrics</h2>
            <div className="mb-8">
            <LineChart width={800} height={400} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Wind" stroke="#8884d8" />
              <Line type="monotone" dataKey="Solar" stroke="#82ca9d" />
              <Line type="monotone" dataKey="LEDs" stroke="#ffc658" />
              <Line type="monotone" dataKey="EVs" stroke="#ff7300" />
            </LineChart>
            </div>
	     <span className='flex flex-1'>
                <h3 className=''>Source URL: </h3>
                <Link className="text-blue-500 underline hover:text-blue-700 focus:ring focus:ring-blue-300" to="https://www.energy.gov/policy/articles/6-charts-will-make-you-optimistic-about-americas-clean-energy-future">America’s Clean Energy Future</Link>
              </span>

            <div className="prose max-w-none">
              <p>
              The line chart tracks the progress of clean energy technologies from 2008 to 2023. 
              Wind and solar power have shown consistent growth in deployment. 
              LED lighting experienced an exponential increase in adoption, reaching over 200-fold. Electric vehicles, though in early stages, are gaining momentum. 
              This chart illustrates the trajectory of key technologies over time, emphasizing the scaling of clean energy innovations.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};