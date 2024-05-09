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
    ath: { [key: string]: number };
    current_price: { [key: string]: number };
    fully_diluted_valuation: { [key: string]: number };
    circulating_supply: number;
    total_supply: number;
    max_supply: any;
    price_change_percentage_24h: number;
    price_change_24h: number;
    market_cap_rank: number;
    market_cap: { [key: string]: number };
    total_volume: { [key: string]: number };
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
