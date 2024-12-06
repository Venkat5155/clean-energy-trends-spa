import React from 'react';
import { Header } from '../components/Header';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Clean Energy Emerging Technologies</h1>
            <div className="prose max-w-none">
              <span className='flex flex-1'>
                <h3 className=''>URL: </h3>
                <Link className="text-blue-500 underline hover:text-blue-700 focus:ring focus:ring-blue-300" to="https://www.energy.gov/policy/articles/6-charts-will-make-you-optimistic-about-americas-clean-energy-future">America’s Clean Energy Future</Link>
              </span>
              <p className="mb-6">
              The article highlights advancements in America’s clean energy sector through six compelling data points. 
              It emphasizes significant cost reductions (41%-94%) in technologies like wind power, solar energy, LED lighting, and electric vehicles since 2008. 
              Wind power leads as the primary renewable source, with exponential growth in solar deployment, including both utility-scale and distributed systems. 
              LED lighting adoption surged due to its efficiency, and electric vehicles are reducing emissions while growing steadily. 
              Together, these advancements demonstrate the nation’s accelerating transition to sustainable energy solutions.
              The article further underscores the synergistic effects of policy, innovation, and market dynamics driving clean energy progress. 
              It highlights how investments in research and development have accelerated breakthroughs, making technologies more affordable and accessible. 
              Wind energy, now cost-competitive with fossil fuels, dominates the renewable landscape, while solar's dramatic expansion benefits from both large-scale and rooftop installations. 
              LED lighting, transforming energy use in homes and businesses, exemplifies innovation’s impact on efficiency. 
              Electric vehicles, coupled with a growing charging infrastructure, signal a transformative shift toward sustainable transportation. 
              This momentum showcases America’s commitment to a clean energy future.
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Implementation</h2>
              <p>
                This project is built using a modern tech stack that includes:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>React for the frontend, providing a component-based architecture</li>
                <li>Node.js backend with Express for RESTful API endpoints</li>
                <li>MongoDB for flexible, document-based data storage</li>
                <li>JWT (JSON Web Tokens) for secure authentication</li>
                <li>NGINX as a reverse proxy and static file server</li>
                <li>Tailwind CSS for responsive and maintainable styling</li>
                <li>Recharts for data visualization</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};