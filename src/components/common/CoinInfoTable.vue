<template>
  <div v-if="entryProps.coin">
    <v-card class="rounded-lg overflow-auto" elevation="0">
      <v-card-title class="d-flex align-center">
        <v-icon icon="mdi-chart-box" color="green" class="my-2" />
        <p class="ml-2">Stats</p>
      </v-card-title>
      <v-table>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td class="font-weight-medium">{{ item.label }}</td>
            <td class="text-end">
              {{ convertCurrency(item.value) }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
  <div v-else>
    <v-skeleton-loader type="list-item-three-line@5" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useCurrencyStore } from "@/stores/currency";

import { CoinFromID } from "@/types/Coin";

import { convertCurrency } from "@/helpers/currencyConverter";

const entryProps = defineProps<{
  coin: CoinFromID | null;
}>();

const currencyStore = useCurrencyStore();

const data = computed(() => {
  const currentCurrency = currencyStore.currency;

  if (entryProps.coin) {
    return [
      {
        label: "Market Cap",
        value: entryProps.coin.market_data.market_cap[currentCurrency],
      },
      {
        label: "Fully Diluted Valuation",
        value:
          entryProps.coin.market_data.fully_diluted_valuation[currentCurrency],
      },
      {
        label: "All Time High",
        value: entryProps.coin.market_data.ath[currentCurrency],
      },
      {
        label: "Current price",
        value: entryProps.coin.market_data.current_price[currentCurrency],
      },
      {
        label: "Circulating supply",
        value: entryProps.coin.market_data.circulating_supply,
      },
      {
        label: "Total supply",
        value: entryProps.coin.market_data.total_supply,
      },
      {
        label: "Max supply",
        value:
          typeof entryProps.coin.market_data.max_supply === "number"
            ? entryProps.coin.market_data.max_supply
            : entryProps.coin.market_data.max_supply || "N/A",
      },
      {
        label: "Total Volume",
        value: entryProps.coin.market_data.total_volume[currentCurrency],
      },
    ];
  }
  return [];
});
</script>
