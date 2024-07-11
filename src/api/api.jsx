import axios from "axios";

const api = axios.create({
  // baseURL: "http://172.20.10.2:5000",
  baseURL: "http://192.168.1.56:5000",
});
export const getData = async (endpoint, params = {}, headers = {}) => {
  try {
    const response = await api.get(endpoint, { params, headers });
    return response.data; // Trả về toàn bộ phản hồi từ API
  } catch (error) {
    throw error;
  }
};

export const postData = async (endpoint, data, headers = {}) => {
  try {
    const response = await api.post(endpoint, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putData = async (endpoint, id, data, headers = {}) => {
  try {
    const response = await api.put(`${endpoint}/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (endpoint, id, headers = {}) => {
  try {
    const response = await api.delete(`${endpoint}/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};
