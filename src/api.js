import axios from 'axios';


const API_URL = 'http://localhost:3001/api'; // Đặt URL của server của bạn ở đây

const api = {
  register: async (userData) => {
    try {
      console.log(`Sending register request to: ${API_URL}/register`, userData);
      const response = await axios.post(`${API_URL}/register`, userData);
      console.log('Register response data:', response.data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }   
  },

  login: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      console.log(`Sending register request to: ${API_URL}/login`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};




export default api;