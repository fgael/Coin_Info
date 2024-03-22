<!-- CoinDetail.vue -->
<template>
  <div>
    <div v-html="coin?.description?.en" />
  </div>
  <v-sparkline
    :fill="fill"
    :gradient="selectedGradient"
    :line-width="lineWidth"
    :model-value="sparkline"
    :padding="padding"
    :smooth="smooth"
    auto-draw
  />
  <Line :data="chartData" :options="chartOptions" :style="chartStyle" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { fetchCoin } from "@/services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const coinId = ref("");
const coin = ref<Coin | null>(null);
const sparkline = ref();

// Sparkline
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];
const fill = ref(false);
const selectedGradient = ref(gradients[5]);
const padding = ref(8);
const smooth = ref(true);

const lineWidth = ref(2);

interface Coin {
  id: string;
  name: string;
  symbol: string;
  description: {
    en: string;
  };
  market_data: {
    sparkline_7d: {
      price: Array<number[]>;
    };
  };
}

onMounted(async () => {
  // Get the coinId from the route params
  const routeParamsId = useRoute().params.id;

  // Convert the route parameter to a string
  coinId.value = Array.isArray(routeParamsId)
    ? routeParamsId[0]
    : routeParamsId;

  // Fetch the coin details
  coin.value = await fetchCoin(coinId.value, true);
  // Formatage des données pour correspondre au type SparklineItem
  sparkline.value = coin.value?.market_data?.sparkline_7d?.price;
  console.log(sparkline.value);
});

const chartData = computed(() => {
  // const labels = sparkline.value.map((value: number, index: number) => {
  //   const currentDate = new Date(); // Date actuelle
  //   currentDate.setHours(currentDate.getHours() + index);
  //   return `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  // });

  return {
    labels: sparkline.value,
    datasets: [
      {
        label: "Sparkline Data",
        data: sparkline.value,
      },
    ],
  };
});

const chartOptions = computed(() => ({
  responsive: false,
  maintainAspectRatio: false,
}));

const chartStyle = computed(() => ({
  height: "50%",
  width: "100%",
}));
</script>
