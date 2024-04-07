<template>
  <v-container>
    <v-row>
      <v-col cols="4"> <CoinCard :coin="coinCard" /> </v-col>
      <v-col cols="8">
        <v-card class="rounded-xl" elevation="0" v-if="sparkline">
          <v-card-title class="text-center">
            7 day price chart for {{ coin?.name }}
          </v-card-title>
          <CoinChart :sparkline="sparkline" />
        </v-card>
      </v-col>
    </v-row>
    <div>
      <div v-html="coin?.description?.en" />
    </div>
  </v-container>
</template>

<script setup lang="ts">
// Vue
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// API
import { fetchCoin } from "@/services/api";

// Types
import { CoinFromList, Coin } from "@/types/Coin";

// Components
import CoinCard from "@/components/common/CoinCard.vue";
import CoinChart from "@/components/common/CoinChart.vue";

const coinId = ref("");
const coin = ref<Coin | null>(null);
const coinCard = ref<CoinFromList | null>(null);
const sparkline = ref<number[] | null>(null);

onMounted(async () => {
  // Get the coinId from the route params
  const routeParamsId = useRoute().params.id;

  // Convert the route parameter to a string
  coinId.value = Array.isArray(routeParamsId)
    ? routeParamsId[0]
    : routeParamsId;

  // Fetch the coin details
  coin.value = await fetchCoin(coinId.value, true);
  if (coin.value) {
    coinCard.value = {
      id: coin.value.id,
      name: coin.value.name,
      image: coin.value.image.thumb,
      current_price: coin.value.market_data.current_price.usd,
      price_change_percentage_24h:
        coin.value.market_data.price_change_percentage_24h,
      market_cap_rank: coin.value.market_data.market_cap_rank,
      high_24h: coin.value.market_data.high_24h.usd,
      low_24h: coin.value.market_data.low_24h.usd,
      sparkline_in_7d: {
        price: coin.value.market_data.sparkline_7d.price,
      },
    };
  }
  if (coin.value?.market_data?.sparkline_7d?.price) {
    sparkline.value = coin.value?.market_data?.sparkline_7d?.price;
  }
});
</script>
