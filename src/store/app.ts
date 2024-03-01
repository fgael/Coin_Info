// Utilities
import { defineStore } from "pinia";

export const useApiStatusStore = defineStore("apiStatus", {
  state: () => ({
    online: false,
  }),

  actions: {
    setOnline(online: boolean) {
      this.online = online;
    },
  },
});
