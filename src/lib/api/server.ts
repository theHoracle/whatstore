"use server";

import axios, { AxiosResponse } from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { auth } from '@clerk/nextjs/server';

const baseConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
};

const serverApi = applyCaseMiddleware(axios.create(baseConfig));

serverApi.interceptors.request.use(async (config) => {
  const { getToken } = await auth();
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiServer = {
  get: <TResponse>(url: string) => 
    serverApi.get<TResponse, AxiosResponse<TResponse>>(url),
  post: <TResponse, TRequest = unknown>(url: string, data: TRequest) => 
    serverApi.post<TResponse, AxiosResponse<TResponse>, TRequest>(url, data),
  put: <TResponse, TRequest = unknown>(url: string, data: TRequest) => 
    serverApi.put<TResponse, AxiosResponse<TResponse>, TRequest>(url, data),
  delete: <TResponse>(url: string) => 
    serverApi.delete<TResponse, AxiosResponse<TResponse>>(url),
};

export default serverApi;
