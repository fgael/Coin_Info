<template>
  <v-card class="rounded-xl overflow-auto" elevation="0">
    <v-table hover>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td class="font-weight-medium">{{ item.label }}</td>
          <td class="text-end">
            {{ item.value }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { CoinFromID } from "@/types/Coin";

const entryProps = defineProps<{
  coin: CoinFromID | null;
}>();

const data = computed(() => {
  if (entryProps.coin) {
    return [
      {
        label: "Market Cap",
        value: entryProps.coin.market_data.market_cap.usd.toLocaleString(
          "en-US",
          { style: "currency", currency: "USD" }
        ),
      },
      {
        label: "Fully Diluted Valuation",
        value:
          entryProps.coin.market_data.fully_diluted_valuation.usd.toLocaleString(
            "en-US",
            { style: "currency", currency: "USD" }
          ),
      },
      {
        label: "All Time High",
        value: entryProps.coin.market_data.ath.usd.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
      },
      {
        label: "Current price",
        value: entryProps.coin.market_data.current_price.usd.toLocaleString(
          "en-US",
          { style: "currency", currency: "USD" }
        ),
      },
      {
        label: "Circulating supply",
        value:
          entryProps.coin.market_data.circulating_supply.toLocaleString(
            "en-US"
          ),
      },
      {
        label: "Total supply",
        value: entryProps.coin.market_data.total_supply.toLocaleString("en-US"),
      },
      {
        label: "Max supply",
        value: entryProps.coin.market_data.max_supply
          ? entryProps.coin.market_data.max_supply.toLocaleString("en-US")
          : "N/A",
      },
      {
        label: "Total Volume",
        value: entryProps.coin.market_data.total_volume.usd.toLocaleString(
          "en-US",
          { style: "currency", currency: "USD" }
        ),
      },
    ];
  }
  return [];
});
</script>
