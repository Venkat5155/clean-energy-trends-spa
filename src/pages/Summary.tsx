import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

export const Summary = () => {
  const [data, setData] = useState([]);
  const chartUrl = import.meta.env.VITE_CHART_API_URL || 'http://localhost:3000/api';

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