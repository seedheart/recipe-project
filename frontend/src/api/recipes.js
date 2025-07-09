import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/recipes";

export const getRecipes = async (page = 1, limit = 15) => {
  console.log(`Making get recipes API call at ${BASE_URL}?page=${page}&limit=${limit}`);
  const res = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
  console.log("Get Recipes API response:", res);
  return res.data;
};

export const searchRecipes = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  console.log(`Making search API call at ${BASE_URL}/search?${params}`);
  const res = await axios.get(`${BASE_URL}/search?${params}`);
  console.log("Search API response:", res);
  return res.data;
};