// src/services/apiService.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.instantwebtools.net/v1',
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 404) {
      return Promise.reject(new Error('Resource not found'));
    }
    return Promise.reject(error);
  }
);

export const getPassengers = (page: number = 0, size: number = 10) =>
  api.get(`/passenger?page=${page}&size=${size}`);

export const getPassengerById = (id: string) => api.get(`/passenger/${id}`);
export const getAirlineById = (id: string) => api.get(`/airlines/${id}`);
