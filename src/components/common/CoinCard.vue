<template>
  <div v-if="entryProps.coin">
    <v-card class="rounded-xl" elevation="0">
      <v-card-title class="d-flex align-center">
        <v-avatar density="compact" class="mr-2">
          <v-img :src="entryProps.coin.image" />
        </v-avatar>
        {{ entryProps.coin.name }}
        <v-chip label density="comfortable" size="small" class="ml-2">
          #{{ entryProps.coin.market_cap_rank }}
        </v-chip>
      </v-card-title>
      <v-card-text class="d-flex align-center">
        <div class="text-h5 font-weight-medium">
          {{
            entryProps.coin.current_price > 0.01
              ? entryProps.coin.current_price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              : "$" + entryProps.coin.current_price.toFixed(8)
          }}
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
            {{
              entryProps.coin.low_24h > 0.01
                ? entryProps.coin.low_24h.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$" + entryProps.coin.low_24h.toFixed(8)
            }}
            <p class="text-body-2 mr-2">24h Range</p>
            {{
              entryProps.coin.high_24h > 0.01
                ? entryProps.coin.high_24h.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$" + entryProps.coin.high_24h.toFixed(8)
            }}
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

const entryProps = defineProps<{
  coin: CoinFromList | null;
}>();

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
