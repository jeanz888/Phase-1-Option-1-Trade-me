import axios from 'axios';

// Set the base URL for the API
const API_URL = 'http://localhost:3000/api';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Axios response promise
 */
export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

/**
 * Register user
 * @param {string} username - Username
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Axios response promise
 */
export const register = (username, email, password) => {
  return api.post('/auth/register', { username, email, password });
};

/**
 * Get all items
 * @returns {Promise} - Axios response promise
 */
export const getItems = () => {
  return api.get('/items');
};

/**
 * Get a single item by id
 * @param {string} id - Item id
 * @returns {Promise} - Axios response promise
 */
export const getItem = (id) => {
  return api.get(`/items/${id}`);
};

/**
 * Create a new item
 * @param {Object} item - Item data
 * @returns {Promise} - Axios response promise
 */
export const createItem = (item) => {
  return api.post('/items', item);
};

/**
 * Update an existing item by id
 * @param {string} id - Item id
 * @param {Object} item - Updated item data
 * @returns {Promise} - Axios response promise
 */
export const updateItem = (id, item) => {
  return api.put(`/items/${id}`, item);
};

/**
 * Delete an item by id
 * @param {string} id - Item id
 * @returns {Promise} - Axios response promise
 */
export const deleteItem = (id) => {
  return api.delete(`/items/${id}`);
};

export default api;