<template>
  <div v-if="entryProps.coin">
    <v-card class="rounded-lg" elevation="0">
      <v-card-title class="d-flex align-center">
        <v-icon icon="mdi-swap-horizontal-circle" color="green" class="my-2" />
        <p class="ml-2">Converter</p>
      </v-card-title>
      <div class="pt-2 px-4 pb-5">
        <v-text-field
          v-model="dollarAmount"
          hide-details
          label="USD"
          variant="outlined"
          clearable
          type="number"
          @click:clear="(cryptoAmount = null), (dollarAmount = null)"
          @update:modelValue="convertToCrypto"
        />
        <div class="py-2" />
        <v-text-field
          v-model="cryptoAmount"
          hide-details
          :label="entryProps.coin?.symbol.toUpperCase()"
          variant="outlined"
          clearable
          type="number"
          @click:clear="(cryptoAmount = null), (dollarAmount = null)"
          @update:modelValue="convertToDollar"
        />
      </div>
    </v-card>
  </div>
  <div v-else>
    <v-skeleton-loader type="list-item-three-line@2" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { CoinFromID } from "@/types/Coin";

const entryProps = defineProps<{
  coin: CoinFromID | null;
}>();

const dollarAmount = ref<number | null>(null);
const cryptoAmount = ref<number | null>(1);

const convertToCrypto = () => {
  const exchangeRate = entryProps.coin?.market_data?.current_price.usd;
  if (exchangeRate && dollarAmount.value) {
    cryptoAmount.value = dollarAmount.value / exchangeRate;
  }
};

const convertToDollar = () => {
  if (entryProps.coin) {
    const exchangeRate = entryProps.coin?.market_data?.current_price.usd;
    if (exchangeRate && cryptoAmount.value) {
      dollarAmount.value = parseFloat(
        (cryptoAmount.value * exchangeRate).toFixed(2)
      );
    }
  }
};

watch(
  () => entryProps.coin,
  () => {
    convertToDollar();
  }
);
</script>
