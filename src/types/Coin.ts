export interface CoinFromList {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_24h: number;
  market_cap_rank: number;
  high_24h: number;
  low_24h: number;
  sparkline_in_7d: {
    price: Array<number>;
  };
}

export interface CoinFromID {
  id: string;
  symbol: string;
  name: string;
  image: { thumb: string };
  description: {
    en: string;
  };
  market_data: {
    ath: { usd: number };
    current_price: {
      usd: number;
    };
    fully_diluted_valuation: { usd: number };
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    price_change_percentage_24h: number;
    price_change_24h: number;
    market_cap_rank: number;
    market_cap: { usd: number };
    total_volume: { usd: number };
    low_24h: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    sparkline_7d: {
      price: Array<number>;
    };
  };
}
