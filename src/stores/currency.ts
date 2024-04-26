import { defineStore } from "pinia";

export const useCurrencyStore = defineStore({
  id: "currency",
  state: () => ({
    currency: "usd",
  }),
  actions: {
    setCurrency(newCurrency: string) {
      this.currency = newCurrency;
    },
  },
});
