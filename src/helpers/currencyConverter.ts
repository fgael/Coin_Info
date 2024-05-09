import { useCurrencyStore } from "@/stores/currency";

export const convertCurrency = (price: number) => {
  const currencyStore = useCurrencyStore();
  const currentCurrency = currencyStore.currency;
  switch (currentCurrency) {
    case "eur":
      return price.toLocaleString("fr-FR", {
        style: "currency",
        currency: "EUR",
      });
    case "usd":
    default:
      return price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    case "gbp":
      return price.toLocaleString("en-GB", {
        style: "currency",
        currency: "GBP",
      });
    case "rub":
      return price.toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB",
      });
    case "twd":
      return price.toLocaleString("zh-TW", {
        style: "currency",
        currency: "TWD",
      });
    case "cny":
      return price.toLocaleString("zh-CN", {
        style: "currency",
        currency: "CNY",
      });
    case "jpy":
      return price.toLocaleString("ja-JP", {
        style: "currency",
        currency: "JPY",
      });
    case "inr":
      return price.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
  }
};
