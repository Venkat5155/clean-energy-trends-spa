import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Summary = () => {
  const [data, setData] = useState([]);
  const chartUrl = 'http://209.38.144.184:3000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        axios.get(`${chartUrl}/summary-data`, {
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Technology Adoption Trends</h2>
            <div className="mb-8">
            <BarChart width={800} height={400} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Adoption" fill="#8884d8" />
              <Bar dataKey="Reduction" fill="#82ca9d" />
            </BarChart>
            </div>
	     <span className='flex flex-1'>
                <h3 className=''>Source URL: </h3>
                <Link className="text-blue-500 underline hover:text-blue-700 focus:ring focus:ring-blue-300" to="https://www.energy.gov/policy/articles/6-charts-will-make-you-optimistic-about-americas-clean-energy-future">America’s Clean Energy Future</Link>
              </span>

            <div className="prose max-w-none">
              <p>
              The bar chart compares adoption rates and cost reductions for key clean energy technologies.
              Wind power leads in adoption, while LED lighting shows the most significant cost reduction (94%). 
              Solar energy technologies, both utility-scale and distributed, show strong adoption growth with substantial cost decreases. 
              Electric vehicles, while still emerging, indicate promising future trends in clean transportation. 
              This visualization highlights the rapid technological advancements and affordability driving clean energy adoption.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};