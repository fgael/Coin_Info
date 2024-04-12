<template>
  <v-app-bar
    app
    class="bg-light-background"
    elevation="3"
    :style="{ position: 'fixed', top: '0', width: '100%', zIndex: '1000' }"
  >
    <!-- <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon> -->
    <!-- <v-img
      src="/"
      alt="Logo"
      max-height="40"
      contain
    ></v-img> -->

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
    <v-spacer></v-spacer>
    <!-- <v-text-field
      v-model="search"
      class="mx-3"
      label="Search Coin"
      variant="outlined"
      density="compact"
      prepend-inner-icon="mdi-magnify"
      clearable
      hide-details
      single-line
      style="max-width: 250px"
      @keyup.enter="searchCoin"
    /> -->
    <v-chip :prepend-icon="apiIcon" :color="apiOnline ? 'green' : 'red'">
      {{ apiStatusText }}
    </v-chip>
    <v-btn class="ml-2" density="compact" icon @click="toggleTheme">
      <v-icon size="small">{{
        darkTheme ? "mdi-weather-night" : "mdi-white-balance-sunny"
      }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import router from "@/router";
import { useTheme } from "vuetify";
import { emitter } from "@/mitt";

const theme = useTheme();
const darkTheme = ref(false);
const apiOnline = ref(true);
const apiStatusText = ref("API Online");
const apiIcon = ref("mdi-check-network-outline");
// const search = ref("");

// const searchCoin = () => {
//   if (search.value) {
//     const searchQuery = search.value.toLowerCase();
//     search.value = "";
//     router.push({ name: "CoinView", params: { id: searchQuery } });
//   }
// };

const toggleTheme = () => {
  darkTheme.value = !darkTheme.value;
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
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
