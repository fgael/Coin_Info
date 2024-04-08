<template>
  <v-container class="fill-height align-start pa-0 pt-3">
    <v-row no-gutters>
      <v-col cols="12">
        <v-btn variant="plain" prepend-icon="mdi-chevron-left" to="/">
          Back
        </v-btn>
      </v-col>
      <v-col cols="12" lg="4" class="pa-2 pa-sm-3">
        <CoinCard :coin="coinFromList" />
        <div class="py-2 py-sm-3" />
        <CoinInfoTable :coin="coinFromID" />
        <div class="py-2 py-sm-3" />
        <v-card class="rounded-xl" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-swap-horizontal-circle" color="green" />
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
              :label="coinFromID?.symbol.toUpperCase()"
              variant="outlined"
              clearable
              type="number"
              @click:clear="(cryptoAmount = null), (dollarAmount = null)"
              @update:modelValue="convertToDollar"
            />
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" lg="8" class="pa-2 pa-sm-3">
        <CoinChart :sparkline="sparkline" />
        <div class="py-2 py-sm-3" />
        <v-card class="rounded-xl" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-information" color="green"> </v-icon>
            <p class="ml-2">About {{ coinFromID?.symbol.toUpperCase() }}</p>
          </v-card-title>
          <v-card-text>
            <div
              style="white-space: pre-line"
              v-html="coinFromID?.description?.en"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchCoin } from "@/services/api";
import { CoinFromList, CoinFromID } from "@/types/Coin";
import CoinCard from "@/components/common/CoinCard.vue";
import CoinChart from "@/components/common/CoinChart.vue";
import CoinInfoTable from "@/components/common/CoinInfoTable.vue";

const coinId = ref("");
const coinFromID = ref<CoinFromID | null>(null);
const coinFromList = ref<CoinFromList | null>(null);
const sparkline = ref<number[] | null>(null);

const dollarAmount = ref<number | null>(null);
const cryptoAmount = ref<number | null>(1);

const convertToCrypto = () => {
  const exchangeRate = coinFromID.value?.market_data?.current_price.usd;
  if (exchangeRate && dollarAmount.value) {
    cryptoAmount.value = dollarAmount.value / exchangeRate;
  }
};

const convertToDollar = () => {
  const exchangeRate = coinFromID.value?.market_data?.current_price.usd;
  if (exchangeRate && cryptoAmount.value) {
    dollarAmount.value = cryptoAmount.value * exchangeRate;
  }
};

onMounted(async () => {
  const routeParamsId = useRoute().params.id;
  coinId.value = Array.isArray(routeParamsId)
    ? routeParamsId[0]
    : routeParamsId;
  coinFromID.value = await fetchCoin(coinId.value, true);
  convertToDollar();
  if (coinFromID.value) {
    coinFromList.value = {
      id: coinFromID.value.id,
      symbol: coinFromID.value.symbol,
      name: coinFromID.value.name,
      image: coinFromID.value.image.thumb,
      current_price: coinFromID.value.market_data.current_price.usd,
      price_change_percentage_24h:
        coinFromID.value.market_data.price_change_percentage_24h,
      price_change_24h: coinFromID.value.market_data.price_change_24h,
      market_cap_rank: coinFromID.value.market_data.market_cap_rank,
      high_24h: coinFromID.value.market_data.high_24h.usd,
      low_24h: coinFromID.value.market_data.low_24h.usd,
      sparkline_in_7d: {
        price: coinFromID.value.market_data.sparkline_7d.price,
      },
    };
  }

  if (coinFromID.value?.market_data?.sparkline_7d?.price) {
    sparkline.value = coinFromID.value?.market_data?.sparkline_7d?.price;
  }
});
</script>
