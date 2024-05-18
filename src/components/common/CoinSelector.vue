<template>
  <v-container>
    <v-autocomplete
      v-model="selectedItem"
      :items="filteredItems"
      item-title="name"
      item-value="id"
      placeholder="Search for a coin ex: Bitcoin"
      label="Search for a coin"
      :no-data-text="
        searchQuery.length >= 1 ? 'No results found' : 'Start typing to search'
      "
      hide-details
      clearable
      variant="outlined"
      return-object
      :loading="isLoading"
      color="green"
      @update:search="handleSearchWithDebounce"
      @update:model-value="$emit('close-dialog')"
    ></v-autocomplete>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { fetchCoinListRenderAPI } from "@/services/api";
import { CoinFromListRenderAPI } from "@/types/Coin";
import router from "@/router";

const selectedItem = ref<CoinFromListRenderAPI | null>(null);
const coinList = ref<CoinFromListRenderAPI[]>([]);
const filteredItems = ref<CoinFromListRenderAPI[]>([]);
const searchQuery = ref("");
const isLoading = ref(false);

let debounceTimeout: NodeJS.Timeout | null = null;

const handleSearchWithDebounce = async (newSearch: string) => {
  isLoading.value = true;
  try {
    coinList.value = await fetchCoinListRenderAPI();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(() => {
    searchQuery.value = newSearch;
    if (newSearch) {
      handleSearch(newSearch);
      isLoading.value = false;
    } else {
      filteredItems.value = [];
      isLoading.value = false;
    }
  }, 200);
};

const handleSearch = (newSearch: string) => {
  filteredItems.value = coinList.value.filter((item) =>
    item.name.toLowerCase().includes(newSearch.toLowerCase())
  );
};

watch(selectedItem, (newSelectedItem) => {
  if (newSelectedItem) {
    router.push({
      name: "CoinView",
      params: { id: newSelectedItem.id.toString() },
    });
  }
});
</script>
