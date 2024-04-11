<template>
  <v-card class="rounded-xl" elevation="0">
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
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

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
  const exchangeRate = entryProps.coin?.market_data?.current_price.usd;
  if (exchangeRate && cryptoAmount.value) {
    dollarAmount.value = cryptoAmount.value * exchangeRate;
  }
};

onMounted(() => {
  if (entryProps.coin !== null && cryptoAmount.value !== null) {
    convertToDollar();
  }
});
</script>
