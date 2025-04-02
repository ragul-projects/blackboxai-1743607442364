import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function ImpactDashboard() {
  // Example data - replace with real data from your backend
  const monthlyDonations = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Donations',
        data: [12500, 15000, 18000, 16500, 21000, 23000],
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        borderColor: 'rgb(14, 165, 233)',
        borderWidth: 2,
      },
    ],
  };

  const projectCategories = {
    labels: ['Education', 'Healthcare', 'Environment', 'Food Security', 'Housing'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(14, 165, 233, 0.6)',
          'rgba(217, 70, 239, 0.6)',
          'rgba(34, 197, 94, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(239, 68, 68, 0.6)',
        ],
      },
    ],
  };

  const beneficiariesReached = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'People Reached',
        data: [500, 800, 1200, 1500, 2000, 2500],
        borderColor: 'rgb(217, 70, 239)',
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const impactStats = [
    { label: 'Total Funds Raised', value: '$250,000', icon: 'fa-dollar-sign' },
    { label: 'Active Projects', value: '45', icon: 'fa-project-diagram' },
    { label: 'Volunteers', value: '1,200', icon: 'fa-users' },
    { label: 'Communities Served', value: '25', icon: 'fa-map-marker-alt' },
  ];

  const recentMilestones = [
    {
      title: 'Education Initiative Success',
      description: '500 students received school supplies',
      date: '2024-02-15',
      category: 'Education',
    },
    {
      title: 'Healthcare Outreach',
      description: 'Free medical camp served 300 patients',
      date: '2024-02-10',
      category: 'Healthcare',
    },
    {
      title: 'Environmental Impact',
      description: '1000 trees planted in urban areas',
      date: '2024-02-05',
      category: 'Environment',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            Community Impact Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Track our collective impact and progress in making positive change.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {impactStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                  <i className={`fas ${stat.icon} text-xl`}></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Donations Chart */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Donations</h2>
            <Bar
              data={monthlyDonations}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>

          {/* Project Categories Chart */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Categories</h2>
            <div className="aspect-square">
              <Doughnut
                data={projectCategories}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Beneficiaries Reached Chart */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">People Reached</h2>
            <Line
              data={beneficiariesReached}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>

          {/* Recent Milestones */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Milestones</h2>
            <div className="space-y-4">
              {recentMilestones.map((milestone, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary-600"></div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{milestone.title}</h3>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <span>{new Date(milestone.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span className="text-primary-600">{milestone.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Download Report CTA */}
        <div className="bg-white rounded-xl shadow-soft p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Want more detailed insights?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Download our comprehensive impact report to learn more about how we're making a difference in communities.
          </p>
          <button className="btn-primary">
            <i className="fas fa-download mr-2"></i>
            Download Impact Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImpactDashboard;