<template>
  <v-container class="fill-height text-center">
    <v-data-iterator
      :items="coinList"
      :items-per-page="itemsPerPage"
      :page="currentPage"
      :loading="loading"
    >
      <template v-slot="{ items }">
        <v-row>
          <v-toolbar dense floating>
            <v-toolbar-title class="text-start">
              Top 100 crypto list
            </v-toolbar-title>
            <div class="d-flex align-center">
              <p class="mr-3">Items</p>
              <v-select
                v-model="itemsPerPage"
                class="mr-4"
                variant="outlined"
                density="compact"
                :hide-details="true"
                :items="itemsPerPageOptions"
                @update:modelValue="updatePage"
              />
            </div>
          </v-toolbar>

          <v-col
            v-for="(coin, index) in items"
            :key="index"
            cols="12"
            lg="4"
            md="6"
          >
            <router-link
              :to="{ name: 'CoinDetail', params: { id: coin.raw.id } }"
            >
              <v-card class="rounded-xl" elevation="0">
                <v-card-title class="d-flex align-center">
                  <v-avatar density="compact" class="mr-2">
                    <v-img :src="coin.raw.image" />
                  </v-avatar>
                  {{ coin.raw.name }}
                  <v-chip label density="comfortable" size="small" class="ml-2">
                    #{{ coin.raw.market_cap_rank }}
                  </v-chip>
                </v-card-title>
                <v-card-text class="d-flex align-center">
                  <div class="text-h5 font-weight-medium">
                    {{
                      coin.raw.current_price > 0.01
                        ? coin.raw.current_price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })
                        : "$" + coin.raw.current_price.toFixed(8)
                    }}
                  </div>
                  <v-icon
                    class="ml-2"
                    :icon="
                      coin.raw.price_change_percentage_24h > 0
                        ? 'mdi-trending-up'
                        : 'mdi-trending-down'
                    "
                    :color="
                      coin.raw.price_change_percentage_24h > 0
                        ? 'success'
                        : 'error'
                    "
                  />
                  <p
                    class="ml-2 text-body-1"
                    :class="
                      coin.raw.price_change_percentage_24h > 0
                        ? 'text-success'
                        : 'text-error'
                    "
                  >
                    {{
                      coin.raw.price_change_percentage_24h > 0
                        ? "+" +
                          coin.raw.price_change_percentage_24h.toFixed(2) +
                          "%"
                        : coin.raw.price_change_percentage_24h.toFixed(2) + "%"
                    }}
                  </p>
                </v-card-text>
                <div class="d-flex align-center">
                  <v-card-text class="pt-0">
                    <v-progress-linear
                      class="custom-gradient mt-2 mb-1"
                      :model-value="
                        calculatePercentage(
                          coin.raw.current_price,
                          coin.raw.low_24h,
                          coin.raw.high_24h
                        )
                      "
                      height="8"
                      rounded
                    />
                    <div class="d-flex justify-space-between">
                      {{
                        coin.raw.low_24h > 0.01
                          ? coin.raw.low_24h.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })
                          : "$" + coin.raw.low_24h.toFixed(8)
                      }}
                      <p class="text-body-2 mr-2">24h Range</p>
                      {{
                        coin.raw.high_24h > 0.01
                          ? coin.raw.high_24h.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })
                          : "$" + coin.raw.high_24h.toFixed(8)
                      }}
                    </div>
                  </v-card-text>
                </div>
              </v-card>
            </router-link>
          </v-col>
        </v-row>
        <v-pagination
          v-model="currentPage"
          :length="pageNumber"
          :total-visible="7"
          class="my-2"
          @update:modelValue="updatePage"
        />
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { fetchCoinList } from "@/services/api";

const currentPage = ref(1);
const itemsPerPage = ref(10);
const loading = ref(false);
const pageNumber = ref(10);

const itemsPerPageOptions = [10, 25, 50, 100];

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

const calculatePercentage = (
  currentPrice: number,
  low24h: number,
  high24h: number
) => {
  return ((currentPrice - low24h) / (high24h - low24h)) * 100;
};

const updatePage = async () => {
  console.log(currentPage.value);
  loading.value = true;
  if (itemsPerPage.value === 10) {
    pageNumber.value = 10;
  } else if (itemsPerPage.value === 25) {
    pageNumber.value = 4;
  } else if (itemsPerPage.value === 50) {
    pageNumber.value = 2;
  } else {
    pageNumber.value = 1;
  }
  coinList.value = await fetchCoinList(
    "usd",
    currentPage.value,
    itemsPerPage.value
  );
  loading.value = false;
};

onMounted(async () => {
  loading.value = true;
  coinList.value = await fetchCoinList(
    "usd",
    currentPage.value,
    itemsPerPage.value
  );
  console.log(coinList.value);
  loading.value = false;
});
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
