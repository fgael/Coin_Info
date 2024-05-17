<template>
  <div v-if="entryProps.coin">
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-card
          :class="[
            'rounded-lg',
            isHovering && entryProps.homeView ? 'pa-0 hover-border' : 'pa-1',
          ]"
          elevation="0"
          v-bind="props"
        >
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
              {{ convertCurrency(entryProps.coin.current_price) }}
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
                {{ convertCurrency(entryProps.coin.low_24h) }}
                <p class="text-body-2 mr-2">24h Range</p>
                {{ convertCurrency(entryProps.coin.high_24h) }}
              </div>
            </v-card-text>
          </div>
        </v-card>
      </template>
    </v-hover>
  </div>
  <div v-else>
    <v-skeleton-loader type="card" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { CoinFromList } from "@/types/Coin";

import { convertCurrency } from "@/helpers/currencyConverter";

const entryProps = defineProps<{
  coin: CoinFromList | null;
  homeView: boolean;
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

<style scoped>
.hover-border {
  border: 4px solid rgba(128, 128, 128, 0.479);
}
</style>
