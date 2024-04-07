<template>
  <v-container class="pa-0">
    <v-infinite-scroll mode="manual" @load="load">
      <v-row no-gutters>
        <v-col
          v-for="coin in coinList"
          :key="coin.id"
          cols="12"
          lg="4"
          md="6"
          class="px-3 py-2"
        >
          <router-link
            :to="{ name: 'CoinDetail', params: { id: coin.id } }"
            class="text-decoration-none"
          >
            <CoinCard :coin="coin" />
          </router-link>
        </v-col>
      </v-row>
    </v-infinite-scroll>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { fetchCoinList } from "@/services/api";

import { CoinFromList } from "@/types/Coin";

import CoinCard from "@/components/common/CoinCard.vue";

const coinList = ref<CoinFromList[]>([]);
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
