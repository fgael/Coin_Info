<!-- CoinDetail.vue -->
<template>
  <div>
    <h1>Coin Details for ID: {{ coinId }}</h1>
    {{ coin?.description?.en }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchCoin, fetchApiStatus } from "@/services/api";
import { useApiStatusStore } from "@/store/app";

const apiStatusStore = useApiStatusStore();

const coinId = ref("");
const coin = ref<Coin | null>(null);

interface Coin {
  id: string;
  name: string;
  symbol: string;
  description: {
    en: string;
  };
}

onMounted(async () => {
  // Get the coinId from the route params
  const routeParamsId = useRoute().params.id;

  // Convert the route parameter to a string
  coinId.value = Array.isArray(routeParamsId)
    ? routeParamsId[0]
    : routeParamsId;

  const isApiOnline = await fetchApiStatus();
  apiStatusStore.setOnline(isApiOnline);

  if (isApiOnline) {
    // Appel pour obtenir les détails d'une pièce spécifique par ID
    coin.value = await fetchCoin(coinId.value);
    console.log(coin.value);
  }
});
</script>
