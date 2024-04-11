<template>
  <v-container class="pa-0">
    <v-infinite-scroll mode="manual" @load="load">
      <template v-slot:default>
        <v-row no-gutters>
          <v-col
            v-for="coin in coinList"
            :key="coin.id"
            cols="12"
            lg="4"
            md="6"
            class="px-4 py-4"
          >
            <router-link
              :to="{ name: 'CoinDetail', params: { id: coin.id } }"
              class="text-decoration-none"
            >
              <CoinCard :coin="coin" />
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
        <v-progress-circular
          indeterminate
          :size="40"
          color="green-darken-1"
        ></v-progress-circular>
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
import { ref, onMounted } from "vue";
import { fetchCoinList } from "@/services/api";

import { CoinFromList } from "@/types/Coin";

import CoinCard from "@/components/common/CoinCard.vue";

const coinList = ref<CoinFromList[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(12);

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
      itemsPerPage.value
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
  coinList.value = await fetchCoinList(
    "usd",
    currentPage.value,
    itemsPerPage.value,
    true
  );
});
</script>
