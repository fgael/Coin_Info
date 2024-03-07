<template>
  <v-app-bar
    app
    class="bg-light-background"
    elevation="1"
    :style="{ position: 'fixed', top: '0', width: '100%', zIndex: '1000' }"
  >
    <!-- <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon> -->
    <!-- <v-img
      src="/path/to/your/logo.png"
      alt="Logo"
      max-height="40"
      contain
    ></v-img> -->

    <v-app-bar-title>
      <v-toolbar-title>
        <router-link
          :to="{ name: 'Home' }"
          class="text-decoration-none text-color-high-contrast"
          >Coin<b class="text-green">Info</b></router-link
        >
      </v-toolbar-title>
    </v-app-bar-title>
    <v-spacer></v-spacer>
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
import { fetchApiStatus } from "@/services/api";
import { ref, watchEffect, onMounted } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const darkTheme = ref(false);
const apiOnline = ref(false);

const toggleTheme = () => {
  darkTheme.value = !darkTheme.value;
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};

// Computed properties to display text and color of the API status
const apiStatusText = ref("API Offline");
const apiIcon = ref("mdi-close-network");

onMounted(async () => {
  apiOnline.value = await fetchApiStatus();
});

// Observe the API status and update the V-Chip accordingly
watchEffect(() => {
  if (apiOnline.value) {
    apiStatusText.value = "API Online";
    apiIcon.value = "mdi-check-network-outline";
  }
});
</script>
