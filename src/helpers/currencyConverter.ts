import { useCurrencyStore } from "@/stores/currency";

export const convertCurrency = (price: number | string) => {
  const currencyStore = useCurrencyStore();
  const currentCurrency = currencyStore.currency;

  // Function to determine minimumFractionDigits dynamically
  const getMinimumFractionDigits = (value: number) => {
    const decimalCount = value.toString().split(".")[1]?.length || 0;
    return Math.max(2, decimalCount);
  };

  // Default locale and currency for formatting
  let locale = "en-US";
  let currency = "USD";

  // Determine locale and currency based on currentCurrency
  switch (currentCurrency) {
    case "eur":
      locale = "fr-FR";
      currency = "EUR";
      break;
    case "gbp":
      locale = "en-GB";
      currency = "GBP";
      break;
    case "rub":
      locale = "ru-RU";
      currency = "RUB";
      break;
    case "twd":
      locale = "zh-TW";
      currency = "TWD";
      break;
    case "cny":
      locale = "zh-CN";
      currency = "CNY";
      break;
    case "jpy":
      locale = "ja-JP";
      currency = "JPY";
      break;
    case "inr":
      locale = "en-IN";
      currency = "INR";
      break;
  }

  // Apply the same logic for formatting based on locale and currency
  if (typeof price === "number" && price < 0.01) {
    const minimumFractionDigits = getMinimumFractionDigits(price);
    return price.toLocaleString(locale, {
      style: "currency",
      currency,
      minimumFractionDigits,
    });
  } else {
    return price.toLocaleString(locale, {
      style: "currency",
      currency,
    });
  }
};
