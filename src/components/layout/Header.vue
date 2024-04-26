<template>
  <v-app-bar
    app
    class="bg-light-background"
    elevation="3"
    :style="{ position: 'fixed', top: '0', width: '100%', zIndex: '1' }"
  >
    <v-app-bar-title>
      <v-toolbar-title>
        <router-link
          :to="{ name: 'HomeView' }"
          class="text-decoration-none text-color-high-contrast"
        >
          Coin<b class="text-green">Info</b>
        </router-link>
      </v-toolbar-title>
    </v-app-bar-title>
    <v-spacer />
    <v-select
      v-model="selectedCurrency"
      :items="currencies"
      label="Currency"
      class="mr-5"
      variant="outlined"
      density="compact"
      hide-details
      style="max-width: 250px"
      @update:modelValue="changeCurrency"
    >
      <template v-slot:selection="{ item }">
        <div class="d-flex align-center">
          <v-icon color="grey-darken-3" size="20" :icon="item.raw.icon" />
          <p class="ml-1">
            {{ item.title }}
          </p>
        </div>
      </template>
      <template v-slot:item="{ props, item }">
        <v-list-item
          v-bind="props"
          :prepend-icon="item.raw.icon"
          :title="item.title"
        />
      </template>
    </v-select>
    <v-chip :prepend-icon="apiIcon" :color="apiOnline ? 'green' : 'red'">
      {{ apiStatusText }}
    </v-chip>
    <v-btn class="ml-2" density="compact" icon @click="toggleTheme">
      <v-icon size="small">
        {{ darkTheme ? "mdi-weather-night" : "mdi-white-balance-sunny" }}
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import router from "@/router";
import { useTheme } from "vuetify";
import { emitter } from "@/mitt";
import { useCurrencyStore } from "@/stores/currency";

const theme = useTheme();
const currencyStore = useCurrencyStore();
const selectedCurrency = ref(currencyStore.currency);
const darkTheme = ref(false);
const apiOnline = ref(true);
const apiStatusText = ref("API Online");
const apiIcon = ref("mdi-check-network-outline");

const currencies = [
  { title: "Dollar", value: "usd", icon: "mdi-currency-usd" },
  { title: "Euro", value: "eur", icon: "mdi-currency-eur" },
  { title: "Pound Sterling", value: "gbp", icon: "mdi-currency-gbp" },
  { title: "Rubel", value: "rub", icon: "mdi-currency-rub" },
  { title: "New Taiwan Dollar", value: "twd", icon: "mdi-currency-twd" },
  { title: "Yuan", value: "cny", icon: "mdi-currency-cny" },
  { title: "Japanese Yen", value: "jpy", icon: "mdi-currency-jpy" },
  { title: "Rupee", value: "inr", icon: "mdi-currency-inr" },
];

const toggleTheme = () => {
  darkTheme.value = !darkTheme.value;
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};

const changeCurrency = (value: string) => {
  currencyStore.setCurrency(value);
};

emitter.on("networkError", () => {
  apiOnline.value = false;
  apiStatusText.value = "Rate Limit";
  apiIcon.value = "mdi-close-network";
});

emitter.on("networkOnline", () => {
  apiOnline.value = true;
  apiStatusText.value = "API Online";
  apiIcon.value = "mdi-check-network-outline";
});
</script>
