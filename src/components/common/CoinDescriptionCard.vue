<template>
  <div v-if="entryProps.coin?.description?.en">
    <div v-if="entryProps.coin">
      <v-card class="rounded-lg" elevation="0">
        <v-card-title class="d-flex align-center">
          <v-icon icon="mdi-information" color="green" class="my-2" />
          <p class="ml-2">About {{ entryProps.coin?.symbol.toUpperCase() }}</p>
        </v-card-title>
        <v-card-text style="overflow: auto; max-height: 206px">
          <div
            style="white-space: pre-line"
            v-html="entryProps.coin?.description?.en"
          />
        </v-card-text>
      </v-card>
    </div>
  </div>
  <div v-else>
    <v-skeleton-loader type="list-item-three-line@3" />
  </div>
</template>

<script setup lang="ts">
import { CoinFromID } from "@/types/Coin";
const entryProps = defineProps<{
  coin: CoinFromID | null;
}>();
</script>
