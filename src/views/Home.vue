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
          <router-link
            :to="{ name: 'CoinDetail', params: { id: coin.id } }"
            class="text-decoration-none"
          >
            <v-card class="rounded-xl" elevation="0">
              <v-card-title class="d-flex align-center">
                <v-avatar density="compact" class="mr-2">
                  <v-img :src="coin.image" />
                </v-avatar>
                {{ coin.name }}
                <v-chip label density="comfortable" size="small" class="ml-2">
                  #{{ coin.market_cap_rank }}
                </v-chip>
              </v-card-title>
              <v-card-text class="d-flex align-center">
                <div class="text-h5 font-weight-medium">
                  {{
                    coin.current_price > 0.01
                      ? coin.current_price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : "$" + coin.current_price.toFixed(8)
                  }}
                </div>
                <v-icon
                  class="ml-2"
                  :icon="
                    coin.price_change_percentage_24h > 0
                      ? 'mdi-trending-up'
                      : 'mdi-trending-down'
                  "
                  :color="
                    coin.price_change_percentage_24h > 0 ? 'success' : 'error'
                  "
                />
                <p
                  class="ml-2 text-body-1"
                  :class="
                    coin.price_change_percentage_24h > 0
                      ? 'text-success'
                      : 'text-error'
                  "
                >
                  {{
                    coin.price_change_percentage_24h > 0
                      ? "+" + coin.price_change_percentage_24h.toFixed(2) + "%"
                      : coin.price_change_percentage_24h.toFixed(2) + "%"
                  }}
                </p>
              </v-card-text>
              <div class="d-flex align-center">
                <v-card-text class="pt-0">
                  <v-progress-linear
                    class="custom-gradient mt-2 mb-1"
                    :model-value="
                      calculatePercentage(
                        coin.current_price,
                        coin.low_24h,
                        coin.high_24h
                      )
                    "
                    height="8"
                    rounded
                  />
                  <div class="d-flex justify-space-between">
                    {{
                      coin.low_24h > 0.01
                        ? coin.low_24h.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })
                        : "$" + coin.low_24h.toFixed(8)
                    }}
                    <p class="text-body-2 mr-2">24h Range</p>
                    {{
                      coin.high_24h > 0.01
                        ? coin.high_24h.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })
                        : "$" + coin.high_24h.toFixed(8)
                    }}
                  </div>
                </v-card-text>
              </div>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-infinite-scroll>
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
  price_change_24h: number;
  market_cap_rank: number;
  high_24h: number;
  low_24h: number;
}

const coinList = ref<Coin[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(12);

const calculatePercentage = (
  currentPrice: number,
  low24h: number,
  high24h: number
) => {
  return ((currentPrice - low24h) / (high24h - low24h)) * 100;
};

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
    itemsPerPage.value
  );
  console.log(coinList.value);
});
</script>
