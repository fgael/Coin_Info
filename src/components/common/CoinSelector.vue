<template>
  <v-container>
    <v-autocomplete
      v-model="selectedItem"
      :items="filteredItems"
      item-title="name"
      item-value="id"
      placeholder="Search for a coin ex: Bitcoin"
      label="Search for a coin"
      hide-details
      clearable
      variant="outlined"
      :no-data-text="
        searchQuery.length >= 1 ? 'No results found' : 'Start typing to search'
      "
      return-object
      @update:search="handleSearchWithDebounce"
      @update:model-value="$emit('close-dialog')"
    ></v-autocomplete>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { fetchCoinListRenderAPI } from "@/services/api";
import { CoinFromListRenderAPI } from "@/types/Coin";
import router from "@/router";

const selectedItem = ref<CoinFromListRenderAPI | null>(null);
const items = ref<CoinFromListRenderAPI[]>([]);
const filteredItems = ref<CoinFromListRenderAPI[]>([]);
const searchQuery = ref("");

let debounceTimeout: NodeJS.Timeout | null = null;

const fetchCoinList = async () => {
  try {
    items.value = await fetchCoinListRenderAPI();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(fetchCoinList);

const handleSearchWithDebounce = (newSearch: string) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  debounceTimeout = setTimeout(() => {
    searchQuery.value = newSearch;
    if (newSearch) {
      handleSearch(newSearch);
    } else {
      filteredItems.value = [];
    }
  }, 500);
};

const handleSearch = (newSearch: string) => {
  filteredItems.value = items.value.filter((item) =>
    item.name.toLowerCase().includes(newSearch.toLowerCase())
  );
};

watch(selectedItem, (newSelectedItem) => {
  if (newSelectedItem) {
    console.log("Selected item:", newSelectedItem.id);
    router.push({
      name: "CoinView",
      params: { id: newSelectedItem.id.toString() },
    });
  }
});
</script>
