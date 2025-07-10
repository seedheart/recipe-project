import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/recipes";

export const getRecipes = async (page = 1, limit = 15) => {
  const res = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
  return res.data;
};

export const searchRecipes = async (filters, page = 1, limit = 15) => {
  const params = new URLSearchParams(filters).toString();
  const res = await axios.get(`${BASE_URL}/search?${params}&page=${page}&limit=${limit}`);
  return res.data;
};