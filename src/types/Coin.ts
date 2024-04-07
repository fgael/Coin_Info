export interface CoinFromList {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
  high_24h: number;
  low_24h: number;
  sparkline_in_7d: {
    price: Array<number>;
  };
}

export interface Coin {
  id: string;
  name: string;
  image: { thumb: string };
  symbol: string;
  description: {
    en: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    price_change_percentage_24h: number;
    market_cap_rank: number;
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
