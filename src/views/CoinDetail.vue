<template>
  <v-container class="fill-height align-start">
    <v-row>
      <v-col cols="4" class="d-flex flex-column" style="max-height: 52vh">
        <CoinCard :coin="coinFromList" />
        <div class="py-3" />
        <CoinInfoTable :coin="coinFromID" />
      </v-col>
      <v-col cols="8">
        <CoinChart :sparkline="sparkline" />
      </v-col>
      <v-col cols="12">
        <v-card class="rounded-xl" elevation="0">
          <v-card-title>
            About {{ coinFromID?.symbol.toUpperCase() }}
          </v-card-title>
          <div class="d-flex justify-center wrap">
            <v-divider length="97.5%" />
          </div>
          <v-card-text>
            <div v-html="coinFromID?.description?.en" />
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

onMounted(async () => {
  const routeParamsId = useRoute().params.id;
  coinId.value = Array.isArray(routeParamsId)
    ? routeParamsId[0]
    : routeParamsId;
  coinFromID.value = await fetchCoin(coinId.value, true);

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
