import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const uploadDataset = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_URL}/data/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const trainModel = async (type) => {
  const response = await axios.post(`${API_URL}/models/train`, { type });
  return response.data;
};

export const generateLLM = async (prompt, task) => {
  const response = await axios.post(`${API_URL}/llm/generate`, { prompt, task });
  return response.data;
};
