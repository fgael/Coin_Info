import axios, { AxiosInstance } from "axios";

const cacheWrapper = (apiFunction: (...args: any[]) => Promise<any>) => {
  const cache: { [key: string]: { data: any; timestamp: number } } = {};

  return async (...args: any[]) => {
    const key = JSON.stringify(args);

    if (cache[key] && Date.now() - cache[key].timestamp < 45000) {
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
  return response.status === 200;
});

export const fetchCoinList = cacheWrapper(
  async (currency: string, page: number, perPage: number) => {
    const response = await apiClient.get("/coins/markets", {
      params: {
        vs_currency: currency,
        order: "market_cap_desc",
        per_page: perPage,
        page: page,
        sparkline: false,
        locale: "en",
        x_cg_demo_api_key: process.env.VITE_APP_COINGECKO_API_KEY,
      },
    });
    return response.data;
  }
);

export const fetchCoin = cacheWrapper(async (id: string) => {
  const response = await apiClient.get(`/coins/${id}`, {
    params: {
      x_cg_demo_api_key: process.env.VITE_APP_COINGECKO_API_KEY,
    },
  });
  return response.data;
});
