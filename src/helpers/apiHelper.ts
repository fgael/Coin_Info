// apiHelper.ts

// Prefix for cache keys in localStorage
const CACHE_KEY_PREFIX = "apiCache_";

// Function to set data in the cache with a timestamp
const setCache = (key: string, data: any) => {
  localStorage.setItem(
    CACHE_KEY_PREFIX + key,
    JSON.stringify({ data, timestamp: Date.now() })
  );
};

// Function to retrieve cached data from localStorage, considering expiration time
const getCache = (key: string, maxAge: number = 30000) => {
  const cachedData = localStorage.getItem(CACHE_KEY_PREFIX + key);

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);

    // Check if the cached data is still valid based on the expiration time
    if (Date.now() - timestamp <= maxAge) {
      return data;
    }
  }

  return null;
};

// Function to fetch data with caching support
export const fetchWithCache = async (
  key: string, // Unique identifier for the cache
  apiCall: (params?: any) => Promise<any>, // API call function
  params?: any, // Optional parameters for the API call
  maxAge: number = 30000 // Maximum age for cache validity in milliseconds
) => {
  // Attempt to retrieve cached data
  const cachedData = getCache(key, maxAge);

  // If cached data is available, return it
  if (cachedData) {
    return cachedData;
  }

  try {
    // If no cached data, make the API call
    const data = await apiCall(params);

    // Cache the retrieved data
    setCache(key, data);

    // Return the fetched data
    return data;
  } catch (error) {
    // Handle errors during API call
    console.error("Error fetching data:", error);

    // Return null in case of an error
    return null;
  }
};
