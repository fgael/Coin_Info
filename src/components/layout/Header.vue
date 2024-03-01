<template>
  <v-app-bar app>
    <!-- <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon> -->
    <!-- <v-img
      src="/path/to/your/logo.png"
      alt="Logo"
      max-height="40"
      contain
    ></v-img> -->

    <v-app-bar-title>
      <v-toolbar-title>
        <router-link :to="{ name: 'Home' }" class="text-decoration-none"
          >Coin Info</router-link
        ></v-toolbar-title
      >
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-chip
      :prepend-icon="icon"
      :color="apiStatusStore.online ? 'green' : 'red'"
    >
      {{ apiStatusText }}
    </v-chip>
    <!-- Boutons à droite -->
    <v-btn class="ml-2" density="compact" icon @click="toggleTheme">
      <v-icon size="small">{{
        darkTheme ? "mdi-weather-night" : "mdi-white-balance-sunny"
      }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useTheme } from "vuetify";
import { useApiStatusStore } from "@/store/app";

const theme = useTheme();
const darkTheme = ref(false);
const apiStatusStore = useApiStatusStore();
const icon = ref("");

const toggleTheme = () => {
  darkTheme.value = !darkTheme.value;
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};

// Computed properties to display text and color of the API status
const apiStatusText = ref("API Offline");

// Observe the API status and update the V-Chip accordingly
watchEffect(() => {
  if (apiStatusStore.online) {
    apiStatusText.value = "API Online";
    icon.value = "mdi-check-network-outline";
  } else {
    apiStatusText.value = "API Offline";
    icon.value = "mdi-close-network";
  }
});
</script>
