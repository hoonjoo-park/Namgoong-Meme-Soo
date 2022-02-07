import { API_KEY } from 'constants/';

export const fetcher = async () => {
  const response = await fetch(API_KEY);
  const data = response.json();
  return data;
};
