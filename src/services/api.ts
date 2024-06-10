import axios, { AxiosInstance } from "axios";
import { emitter } from "../mitt";
import router from "@/router";
import { CoinFromListRenderAPI } from "@/types/Coin";

const cacheWrapper = (apiFunction: (...args: any[]) => Promise<any>) => {
  const cache: { [key: string]: { data: any; timestamp: number } } = {};

  return async (...args: any[]) => {
    const key = JSON.stringify(args);

    if (cache[key] && Date.now() - cache[key].timestamp < 45000) {
      return cache[key].data;
    }

    try {
      const response = await apiFunction(...args);
      if (response) {
        emitter.emit("networkOnline");
      }
      cache[key] = { data: response, timestamp: Date.now() };
      return response;
    } catch (error: any) {
      console.error("An error occurred during the API request:", error);
      if (error.code === "ERR_BAD_REQUEST") {
        router.push({ name: "NotFoundView" });
      }
      if (error.code === "ERR_NETWORK") {
        emitter.emit("networkError");
        router.push({ name: "RateLimitView" });
      }
      return null;
    }
  };
};

export const apiClient: AxiosInstance = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

export const fetchApiStatus = cacheWrapper(async () => {
  const response = await apiClient.get("/ping", {});
  return response.status === 200;
});

export const fetchCoinList = cacheWrapper(
  async (
    currency: string,
    page: number,
    perPage: number,
    sparkline: boolean
  ) => {
    const response = await apiClient.get("/coins/markets", {
      params: {
        vs_currency: currency,
        order: "market_cap_desc",
        per_page: perPage,
        page: page,
        sparkline: sparkline,
        locale: "en",
      },
    });
    return response.data;
  }
);

export const fetchCoin = cacheWrapper(
  async (id: string, sparkline: boolean) => {
    const response = await apiClient.get(`/coins/${id}`, {
      params: {
        sparkline: sparkline,
      },
    });
    return response.data;
  }
);

export const fetchCoinListStaticAPI = async (): Promise<
  CoinFromListRenderAPI[]
> => {
  try {
    const response = await axios.get("http://141.94.22.42:50001/coins");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
