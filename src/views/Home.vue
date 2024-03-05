<template>
  <v-container class="fill-height">
    <v-row>
      <v-col
        v-for="(coin, index) in coinList"
        :key="index"
        cols="12"
        lg="4"
        md="6"
      >
        <router-link :to="{ name: 'CoinDetail', params: { id: coin.id } }">
          <v-card class="rounded-xl" elevation="0">
            <v-card-title>
              <v-avatar density="compact">
                <v-img :src="coin.image" />
              </v-avatar>
              {{ coin.name }}</v-card-title
            >
            <div class="d-flex align-center">
              <v-card-text>{{ coin.current_price }}$</v-card-text>
              <v-card-text class="py-0 d-flex align-center justify-end">
                <p>24h changes:</p>
                &nbsp;
                <p
                  :class="
                    coin.price_change_percentage_24h > 0
                      ? 'text-success'
                      : 'text-error'
                  "
                >
                  {{
                    coin.price_change_percentage_24h > 0
                      ? "+" + coin.price_change_percentage_24h
                      : coin.price_change_percentage_24h
                  }}%
                </p>
              </v-card-text>
            </div>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { fetchCoinList } from "@/services/api";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const coinList = ref<Array<Coin>>([]);

onMounted(async () => {
  coinList.value = await fetchCoinList();
  console.log(coinList.value);
});
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
