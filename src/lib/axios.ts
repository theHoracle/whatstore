import { auth } from '@clerk/nextjs/server';
import axios from 'axios';


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  const { getToken } = await auth();
  const token = await getToken();

  console.log('token', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
