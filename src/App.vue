<template>
  <v-app>
    <v-main>
      <Suspense>
        <router-view />
      </Suspense>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { fetchWithCache } from "@/helpers/apiHelper";
import { fetchApiStatus } from "@/services/api";

onMounted(async () => {
  const cachedApiStatus = localStorage.getItem("apiStatusOnline");
  const isApiOnline = cachedApiStatus
    ? JSON.parse(cachedApiStatus)
    : await fetchWithCache("apiStatus", fetchApiStatus);
  console.log(isApiOnline);
});
</script>
