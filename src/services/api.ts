import axios from 'axios';
import { API_ENDPOINTS } from '../apiConfig';
import { Project } from '../features/types';

export interface FetchProjectsParams {
  [key: string]: any;
  page?: number;
  limit?: number;
  search?: string;
}

export const fetchProjectsFromAPI = async (
  params?: FetchProjectsParams
): Promise<Project[]> => {
  try {
    const response = await axios.get(API_ENDPOINTS.projects, { params });
    if (Array.isArray(response.data)) {
      return response.data as Project[];
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching projects: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const fetchData = async (endpoint: string, token: string) => {
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
