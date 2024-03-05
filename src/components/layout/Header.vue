<template>
  <v-app-bar app class="bg-light-background" elevation="0">
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
    <v-chip :prepend-icon="icon" :color="apiStatus ? 'green' : 'red'">
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
import { ref, watchEffect, onMounted } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const darkTheme = ref(false);
const apiStatus = ref(false);
const icon = ref("");

const toggleTheme = () => {
  darkTheme.value = !darkTheme.value;
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};

// Computed properties to display text and color of the API status
const apiStatusText = ref("API Offline");

onMounted(() => {
  const cachedApiStatus = localStorage.getItem("apiCache_apiStatus");
  if (cachedApiStatus) {
    apiStatus.value = JSON.parse(cachedApiStatus);
  }
});

// Observe the API status and update the V-Chip accordingly
watchEffect(() => {
  console.log(apiStatus.value);
  if (apiStatus.value) {
    apiStatusText.value = "API Online";
    icon.value = "mdi-check-network-outline";
  } else {
    apiStatusText.value = "API Offline";
    icon.value = "mdi-close-network";
  }
});
</script>
