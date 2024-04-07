<template>
  <v-container>
    <v-infinite-scroll mode="manual" @load="load">
      <v-row no-gutters>
        <v-col
          v-for="coin in coinList"
          :key="coin.id"
          cols="12"
          lg="4"
          md="6"
          class="pa-2"
        >
          <CoinCard :coin="coin" />
        </v-col>
      </v-row>
    </v-infinite-scroll>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { fetchCoinList } from "@/services/api";

import CoinCard from "@/components/common/CoinCard.vue";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_24h: number;
  market_cap_rank: number;
  high_24h: number;
  low_24h: number;
  sparkline_in_7d: {
    price: Array<number>;
  };
}

const coinList = ref<Coin[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(12);

const load = async ({ done }: { done: (status: "ok" | "error") => void }) => {
  try {
    currentPage.value++;
    const newData = await fetchCoinList(
      "usd",
      currentPage.value,
      itemsPerPage.value
    );
    coinList.value = [...coinList.value, ...newData];
    done("ok");
  } catch (error) {
    done("error");
  }
};

onMounted(async () => {
  coinList.value = await fetchCoinList(
    "usd",
    currentPage.value,
    itemsPerPage.value,
    true
  );
});
</script>
