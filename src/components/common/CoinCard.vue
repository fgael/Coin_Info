<template>
  <div v-if="entryProps.coin">
    <v-card class="rounded-lg" elevation="0">
      <v-card-title class="d-flex align-center">
        <v-avatar density="compact" class="mr-2 my-1">
          <v-img :src="entryProps.coin.image" />
        </v-avatar>
        {{ entryProps.coin.name }}
        <v-chip label density="comfortable" size="small" class="ml-2">
          #{{ entryProps.coin.market_cap_rank }}
        </v-chip>
      </v-card-title>
      <v-card-text class="d-flex align-center">
        <div class="text-h5 font-weight-medium">
          {{ convertPrice(entryProps.coin.current_price) }}
        </div>
        <v-icon
          class="ml-2"
          :icon="
            entryProps.coin.price_change_percentage_24h > 0
              ? 'mdi-trending-up'
              : 'mdi-trending-down'
          "
          :color="
            entryProps.coin.price_change_percentage_24h > 0
              ? 'success'
              : 'error'
          "
        />
        <p
          class="ml-2 text-body-1"
          :class="
            entryProps.coin.price_change_percentage_24h > 0
              ? 'text-success'
              : 'text-error'
          "
        >
          {{
            entryProps.coin.price_change_percentage_24h > 0
              ? "+" +
                entryProps.coin.price_change_percentage_24h.toFixed(2) +
                "%"
              : entryProps.coin.price_change_percentage_24h.toFixed(2) + "%"
          }}
        </p>
      </v-card-text>
      <v-sparkline
        :fill="fill"
        :gradient="selectedGradient"
        :line-width="lineWidth"
        :model-value="entryProps.coin?.sparkline_in_7d?.price"
        :padding="padding"
        :smooth="smooth"
        height="40"
        auto-draw
      />
      <div class="d-flex align-center">
        <v-card-text class="pt-0">
          <v-progress-linear
            class="custom-gradient mt-2 mb-1"
            :model-value="percentageValue"
            height="8"
            rounded
          />
          <div class="d-flex justify-space-between">
            {{ convertPrice(entryProps.coin.low_24h) }}
            <p class="text-body-2 mr-2">24h Range</p>
            {{ convertPrice(entryProps.coin.high_24h) }}
          </div>
        </v-card-text>
      </div>
    </v-card>
  </div>
  <div v-else>
    <v-skeleton-loader type="card" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { CoinFromList } from "@/types/Coin";

import { useCurrencyStore } from "@/stores/currency";

const currencyStore = useCurrencyStore();

const entryProps = defineProps<{
  coin: CoinFromList | null;
}>();

const convertPrice = (price: number) => {
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

// Sparkline
const fill = ref(false);
const selectedGradient = ref(["#46FF00", "#FFE400", "#FF2700"]);
const padding = ref(8);
const smooth = ref(true);
const lineWidth = ref(2);
const percentageValue = computed(() => {
  if (entryProps.coin) {
    const { current_price, low_24h, high_24h } = entryProps.coin;
    return ((current_price - low_24h) / (high_24h - low_24h)) * 100;
  } else {
    return 0;
  }
});
</script>
