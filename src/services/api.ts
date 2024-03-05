import axios, { AxiosInstance } from "axios";

// Helper function to cache API calls for 30 seconds
const cacheWrapper = (apiFunction: (...args: any[]) => Promise<any>) => {
  const cache: { [key: string]: { data: any; timestamp: number } } = {};

  return async (...args: any[]) => {
    const key = JSON.stringify(args);

    if (cache[key] && Date.now() - cache[key].timestamp < 30000) {
      return cache[key].data;
    }

    try {
      const response = await apiFunction(...args);
      cache[key] = { data: response, timestamp: Date.now() };
      return response;
    } catch (error) {
      console.error("An error occurred during the API request:", error);
      return null;
    }
  };
};

export const apiClient: AxiosInstance = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

// Wrap your existing fetch functions with the cacheWrapper
export const fetchApiStatus = cacheWrapper(async () => {
  const response = await apiClient.get("/ping", {
    params: {
      x_cg_demo_api_key: process.env.VITE_APP_COINGECKO_API_KEY,
    },
  });
  console.log(response.status);
  console.log(response.data);
  return response.status === 200;
});

export const fetchCoinList = cacheWrapper(async () => {
  const response = await apiClient.get(
    "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false&locale=en",
    {
      params: {
        x_cg_demo_api_key: process.env.VITE_APP_COINGECKO_API_KEY,
      },
    }
  );
  return response.data;
});

export const fetchCoin = cacheWrapper(async (id: string) => {
  const response = await apiClient.get(`/coins/${id}`, {
    params: {
      x_cg_demo_api_key: process.env.VITE_APP_COINGECKO_API_KEY,
    },
  });
  return response.data;
});
