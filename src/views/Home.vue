<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height">
      <v-chip :append-icon="icon" :color="apiStatus.online ? 'green' : 'red'">
        API Status : {{ apiStatus.online ? "online" : "offline" }}
      </v-chip>
      <v-row>
        <v-col
          v-for="(card, index) in coinList"
          :key="index"
          cols="12"
          lg="4"
          md="6"
        >
          <v-card>
            <v-card-title>
              <v-avatar density="compact">
                <v-img :src="card.image" />
              </v-avatar>
              {{ card.name }}</v-card-title
            >
            <div class="d-flex align-center">
              <v-card-text>{{ card.current_price }}$</v-card-text>
              <v-card-text class="py-0 d-flex align-center justify-end">
                <p>24h changes:</p>
                &nbsp;
                <p
                  :class="
                    card.price_change_percentage_24h > 0
                      ? 'text-success'
                      : 'text-error'
                  "
                >
                  {{
                    card.price_change_percentage_24h > 0
                      ? "+" + card.price_change_percentage_24h
                      : card.price_change_percentage_24h
                  }}%
                </p>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const apiStatus = ref({ online: false });
const icon = ref("");

const coinList = ref<Array<Coin>>([]);

import apiClient from "@/services/api";

const fetchApiStatus = async () => {
  try {
    const response = await apiClient.get("/ping", {
      params: {
        x_cg_demo_api_key: process.env.VITE_APP_COINGECKO_API_KEY,
      },
    });
    console.log(response.status);
    console.log(response.data);
    if (response.status === 200) {
      apiStatus.value.online = true;
      icon.value = "mdi-check-network-outline";
    } else {
      apiStatus.value.online = false;
      icon.value = "mdi-close-network";
    }
  } catch (error) {
    console.error("Une erreur s'est produite lors de la requête API:", error);
    apiStatus.value.online = false;
    icon.value = "mdi-close-network";
  }
};
fetchApiStatus();

const fetchCoinList = async () => {
  try {
    const response = await apiClient.get(
      "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false&locale=en",
      {
        params: {
          x_cg_demo_api_key: process.env.VITE_APP_COINGECKO_API_KEY,
        },
      }
    );
    coinList.value = response.data;
  } catch (error) {
    console.error("Une erreur s'est produite lors de la requête API:", error);
  }
};
fetchCoinList();
</script>
