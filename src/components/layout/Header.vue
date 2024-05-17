<template>
  <v-app-bar
    app
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
    <v-chip :prepend-icon="apiIcon" :color="apiOnline ? 'green' : 'red'">
      {{ apiStatusText }}
    </v-chip>
    <v-app-bar-nav-icon
      class="mx-2"
      variant="text"
      icon="mdi-cog"
      @click="drawer = !drawer"
    />
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    :width="xs ? width : '200'"
    :location="xs ? 'left' : 'right'"
    disable-resize-watcher
  >
    <v-list density="compact">
      <v-select
        v-model="selectedCurrency"
        :items="currencies"
        class="mx-3 mt-2"
        label="Currency"
        variant="outlined"
        density="compact"
        hide-details
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
      <v-divider class="mt-4" />
      <div class="d-flex justify-space-between align-center mx-3">
        <p>Dark Mode</p>
        <v-switch
          v-model="darkTheme"
          dense
          hide-details
          color="success"
          false-icon="mdi-window-close"
          true-icon="mdi-check"
          @change="toggleTheme"
        />
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
// import router from "@/router";
import { useTheme } from "vuetify";
import { emitter } from "@/mitt";
import { useCurrencyStore } from "@/stores/currency";

const theme = useTheme();
const currencyStore = useCurrencyStore();
const { xs, width } = useDisplay();
const selectedCurrency = ref(currencyStore.currency);
const darkTheme = ref(false);
const apiOnline = ref(true);
const apiStatusText = ref("API Online");
const apiIcon = ref("mdi-check-network-outline");
const drawer = ref(false);

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

onMounted(() => {
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (prefersDarkMode) {
    darkTheme.value = true;
    theme.global.name.value = "dark";
  } else {
    darkTheme.value = false;
    theme.global.name.value = "light";
  }
});
</script>
