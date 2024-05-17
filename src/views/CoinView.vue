<template>
  <v-container class="fill-height align-start pa-0 pt-3">
    <v-row no-gutters>
      <v-col cols="12">
        <v-btn variant="plain" prepend-icon="mdi-chevron-left" to="/">
          Back
        </v-btn>
      </v-col>
      <v-col cols="12" lg="4" class="pa-2 pa-sm-3">
        <CoinCard :coin="coinFromList" :home-view="false" />
        <div class="py-2 py-sm-3" />
        <CoinInfoTable :coin="coinFromID" />
        <div class="py-2 py-sm-3" />
        <ConverterCard :coin="coinFromID" />
      </v-col>
      <v-col cols="12" lg="8" class="pa-2 pa-sm-3">
        <CoinChart :sparkline="sparkline" />
        <div class="py-2 py-sm-3" />
        <CoinDescriptionCard :coin="coinFromID" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { fetchCoin } from "@/services/api";
import { CoinFromList, CoinFromID } from "@/types/Coin";

// Import des composants utilisés dans le template
import CoinCard from "@/components/common/CoinCard.vue";
import CoinChart from "@/components/common/CoinChart.vue";
import CoinInfoTable from "@/components/common/CoinInfoTable.vue";
import ConverterCard from "@/components/common/ConverterCard.vue";
import CoinDescriptionCard from "@/components/common/CoinDescriptionCard.vue";

// Déclarations des refs pour les données
const coinId = ref<string>("");
const coinFromID = ref<CoinFromID | null>(null);
const coinFromList = ref<CoinFromList | null>(null);
const sparkline = ref<number[] | null>(null);

// Utilisation de useRoute pour accéder aux paramètres de la route
const route = useRoute();

// Fonction pour charger les données du coin en fonction de l'ID
const loadCoinData = async () => {
  try {
    coinId.value = route.params.id as string;
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

      if (coinFromID.value?.market_data?.sparkline_7d?.price) {
        sparkline.value = coinFromID.value?.market_data?.sparkline_7d?.price;
      }
    }
  } catch (error) {
    console.error("Error fetching coin details:", error);
  }
};

// Appeler loadCoinData lorsque le composant est monté
onMounted(loadCoinData);

// Watcher pour surveiller les changements dans $route.params.id
watch(
  () => route.params.id,
  () => {
    loadCoinData();
  }
);
</script>
