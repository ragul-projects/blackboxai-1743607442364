import React, { useState } from 'react';

function ResourceHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', icon: 'fa-th-large' },
    { id: 'guides', name: 'Guides & Tutorials', icon: 'fa-book' },
    { id: 'tools', name: 'Tools & Templates', icon: 'fa-tools' },
    { id: 'legal', name: 'Legal Resources', icon: 'fa-gavel' },
    { id: 'financial', name: 'Financial Help', icon: 'fa-dollar-sign' },
    { id: 'mental', name: 'Mental Health', icon: 'fa-brain' },
  ];

  const resources = [
    {
      id: 1,
      title: 'Fundraising Success Guide',
      category: 'guides',
      type: 'PDF Guide',
      description: 'A comprehensive guide to planning and executing successful fundraising campaigns.',
      downloadCount: 1234,
      lastUpdated: '2024-02-15',
      icon: 'fa-file-pdf',
      color: 'text-red-500',
    },
    {
      id: 2,
      title: 'Budget Planning Template',
      category: 'tools',
      type: 'Excel Template',
      description: 'Easy-to-use template for planning and tracking your project budget.',
      downloadCount: 856,
      lastUpdated: '2024-02-10',
      icon: 'fa-file-excel',
      color: 'text-green-500',
    },
    {
      id: 3,
      title: 'Legal Documentation Guide',
      category: 'legal',
      type: 'PDF Guide',
      description: 'Essential legal documents and guidelines for non-profit organizations.',
      downloadCount: 567,
      lastUpdated: '2024-02-08',
      icon: 'fa-file-pdf',
      color: 'text-red-500',
    },
    {
      id: 4,
      title: 'Financial Aid Resources',
      category: 'financial',
      type: 'Web Resource',
      description: 'Directory of financial assistance programs and application guides.',
      downloadCount: 789,
      lastUpdated: '2024-02-12',
      icon: 'fa-globe',
      color: 'text-blue-500',
    },
    {
      id: 5,
      title: 'Mental Health Support Guide',
      category: 'mental',
      type: 'PDF Guide',
      description: 'Resources and guidance for mental health support and wellness.',
      downloadCount: 432,
      lastUpdated: '2024-02-14',
      icon: 'fa-file-pdf',
      color: 'text-red-500',
    },
    // Add more resources as needed
  ];

  const filteredResources = resources
    .filter(resource => 
      selectedCategory === 'all' || resource.category === selectedCategory
    )
    .filter(resource =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold font-display mb-4">
              Resource Hub
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Access our comprehensive collection of resources, guides, and tools to help you make a bigger impact.
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-gray-900 bg-white/90 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-xl text-center transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-soft'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <i className={`fas ${category.icon} text-xl mb-2`}></i>
              <div className="text-sm font-medium">{category.name}</div>
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-start">
                <div className={`${resource.color} text-2xl mr-4`}>
                  <i className={`fas ${resource.icon}`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      <i className="fas fa-download mr-1"></i>
                      {resource.downloadCount} downloads
                    </span>
                    <span>
                      <i className="fas fa-clock mr-1"></i>
                      Updated {new Date(resource.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
                  {resource.type}
                </span>
                <button className="btn-primary py-2">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Resource CTA */}
        <div className="mt-16 bg-white rounded-xl shadow-soft p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Have a resource to share?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Help our community grow by sharing your knowledge and resources. Submit your materials for review and make them available to others.
          </p>
          <button className="btn-primary">
            Submit a Resource
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResourceHub;