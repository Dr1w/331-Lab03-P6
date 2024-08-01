import axios from 'axios';
import { Passenger, Airline } from '../type';

const API_BASE_URL = 'https://api.instantwebtools.net/v1';

export const getPassengers = async (): Promise<Passenger[]> => {
  const response = await axios.get(`${API_BASE_URL}/passenger?page=0&size=10`);
  return response.data.data;
};

export const getPassengerById = async (id: string): Promise<Passenger> => {
  const response = await axios.get(`${API_BASE_URL}/passenger/${id}`);
  return response.data;
};

export const getAirlineById = async (id: string): Promise<Airline> => {
  const response = await axios.get(`${API_BASE_URL}/airlines/${id}`);
  return response.data;
};
