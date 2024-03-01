import axios, { AxiosInstance } from "axios";

export const apiClient: AxiosInstance = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

export const fetchApiStatus = async () => {
  try {
    const response = await apiClient.get("/ping", {
      params: {
        x_cg_demo_api_key: process.env.VITE_APP_COINGECKO_API_KEY,
      },
    });
    console.log(response.status);
    console.log(response.data);
    return response.status === 200;
  } catch (error) {
    console.error("An error occurred during the API request:", error);
    return false;
  }
};

export const fetchCoinList = async () => {
  try {
    const response = await apiClient.get(
      "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false&locale=en",
      {
        params: {
          x_cg_demo_api_key: process.env.VITE_APP_COINGECKO_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Une erreur s'est produite lors de la requête API:", error);
    return [];
  }
};

export const fetchCoin = async (id: string) => {
  try {
    const response = await apiClient.get(`/coins/${id}`, {
      params: {
        x_cg_demo_api_key: process.env.VITE_APP_COINGECKO_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Une erreur s'est produite lors de la requête API:", error);
    return [];
  }
};
