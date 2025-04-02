import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const auth = {
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  async logout() {
    localStorage.removeItem('token');
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Crowdfunding services
export const crowdfunding = {
  async getCampaigns(filters) {
    const response = await api.get('/campaigns', { params: filters });
    return response.data;
  },

  async getCampaign(id) {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  },

  async createCampaign(campaignData) {
    const response = await api.post('/campaigns', campaignData);
    return response.data;
  },

  async updateCampaign(id, campaignData) {
    const response = await api.put(`/campaigns/${id}`, campaignData);
    return response.data;
  },

  async deleteCampaign(id) {
    const response = await api.delete(`/campaigns/${id}`);
    return response.data;
  },

  async donate(campaignId, amount) {
    const response = await api.post(`/campaigns/${campaignId}/donate`, { amount });
    return response.data;
  },
};

// Resource Hub services
export const resources = {
  async getResources(category) {
    const response = await api.get('/resources', { params: { category } });
    return response.data;
  },

  async getResource(id) {
    const response = await api.get(`/resources/${id}`);
    return response.data;
  },

  async createResource(resourceData) {
    const response = await api.post('/resources', resourceData);
    return response.data;
  },
};

// Community Map services
export const community = {
  async getLocations(filters) {
    const response = await api.get('/locations', { params: filters });
    return response.data;
  },

  async addLocation(locationData) {
    const response = await api.post('/locations', locationData);
    return response.data;
  },
};

// Social Feed services
export const social = {
  async getPosts(filters) {
    const response = await api.get('/posts', { params: filters });
    return response.data;
  },

  async createPost(postData) {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  async likePost(postId) {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  },

  async commentOnPost(postId, content) {
    const response = await api.post(`/posts/${postId}/comments`, { content });
    return response.data;
  },
};

// Impact Dashboard services
export const impact = {
  async getStatistics(timeframe) {
    const response = await api.get('/impact/statistics', { params: { timeframe } });
    return response.data;
  },

  async getProjectImpact(projectId) {
    const response = await api.get(`/impact/projects/${projectId}`);
    return response.data;
  },
};

// User Profile services
export const profile = {
  async updateProfile(profileData) {
    const response = await api.put('/profile', profileData);
    return response.data;
  },

  async getActivities() {
    const response = await api.get('/profile/activities');
    return response.data;
  },

  async getDonations() {
    const response = await api.get('/profile/donations');
    return response.data;
  },
};

export default {
  auth,
  crowdfunding,
  resources,
  community,
  social,
  impact,
  profile,
};