<template>
  <v-container class="pa-0" fluid>
    <v-infinite-scroll mode="manual" class="px-4" @load="load">
      <template v-slot:default>
        <v-row no-gutters>
          <v-col
            v-for="coin in coinList"
            :key="coin.id"
            cols="12"
            lg="4"
            md="6"
            class="px-lg-4 px-md-2 px-0 py-lg-4 py-2"
          >
            <router-link
              :to="{ name: 'CoinView', params: { id: coin.id } }"
              class="text-decoration-none"
            >
              <CoinCard :coin="coin" :home-view="true" />
            </router-link>
          </v-col>
        </v-row>
      </template>
      <template v-slot:load-more="{ props }">
        <v-btn v-bind="props" size="large" icon variant="text" @click="load">
          <v-icon
            color="green-darken-1"
            size="40"
            icon="mdi-chevron-down-circle"
          />
        </v-btn>
      </template>
      <template v-slot:loading>
        <v-progress-circular indeterminate :size="40" color="green-darken-1" />
      </template>
      <template v-slot:error="{ props }">
        <v-alert type="error" color="red-darken-1">
          <div class="d-flex justify-space-between align-center">
            Something went wrong...
            <v-btn
              color="white"
              size="small"
              variant="outlined"
              v-bind="props"
              @click="load"
            >
              Retry
            </v-btn>
          </div>
        </v-alert>
      </template>
    </v-infinite-scroll>
  </v-container>
</template>

<script lang="ts" setup>
// Vue
import { ref, onMounted, watch } from "vue";

import { useCurrencyStore } from "@/stores/currency";

// API
import { fetchCoinList } from "@/services/api";

// Types
import { CoinFromList } from "@/types/Coin";

// Component
import CoinCard from "@/components/common/CoinCard.vue";

// Variables
const coinList = ref<CoinFromList[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(12);
const currencyStore = useCurrencyStore();

// Functions
const load = async ({
  done,
}: {
  done: (status: "ok" | "error" | "empty") => void;
}): Promise<void> => {
  try {
    currentPage.value++;
    const newData = await fetchCoinList(
      "usd",
      currentPage.value,
      itemsPerPage.value,
      true
    );
    coinList.value = [...coinList.value, ...newData];
    if (typeof done === "function") {
      done("ok");
    } else {
      return;
    }
  } catch (error) {
    if (typeof done === "function") {
      console.error(error);
      done("error");
    } else {
      return;
    }
  }
};

onMounted(async () => {
  await fetchData();

  watch(
    () => currencyStore.currency,
    async () => {
      currentPage.value = 1;
      await fetchData();
    }
  );
});

const fetchData = async () => {
  try {
    const newData = await fetchCoinList(
      currencyStore.currency,
      currentPage.value,
      itemsPerPage.value,
      true
    );
    coinList.value = newData;
  } catch (error) {
    console.error(error);
  }
};
</script>
