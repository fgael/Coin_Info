<template>
  <Line :data="chartData" :options="chartOptions" :style="chartStyle" />
  <div>
    <div v-html="coin?.description?.en" />
  </div>
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
  Filler,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const coinId = ref("");
const coin = ref<Coin | null>(null);
const sparkline = ref();
const lastSparklineValue = ref(0);
const firstSparklineValue = ref(0);
const chartLineColor = ref("rgba(60, 179, 113, 1)");
const chartBackgroundColor = ref("rgba(60, 179, 113, 1)");

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

// Graph data
const chartData = computed(() => {
  const startHour = new Date(); // Heure de début
  const hoursPassed = [];

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    hour12: true,
  };

  for (let i = 166; i >= 0; i--) {
    const hour = new Date(startHour);
    hour.setHours(hour.getHours() - i);
    const formattedHour = hour.toLocaleString("en-US", options);
    hoursPassed.push(formattedHour);
  }

  return {
    labels: hoursPassed,
    datasets: [
      {
        label: "Price",
        data: sparkline.value,
        borderColor: chartLineColor.value,
        fill: true,
        backgroundColor: chartBackgroundColor.value,
      },
    ],
  };
});

const chartOptions = computed(() => ({
  responsive: false,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
}));

const chartStyle = computed(() => ({
  height: "50%",
  width: "100%",
}));

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
  lastSparklineValue.value = sparkline.value[sparkline.value.length - 1];
  firstSparklineValue.value = sparkline.value[0];
  chartLineColor.value =
    lastSparklineValue.value > firstSparklineValue.value
      ? "rgba(60, 179, 113, 0.8)"
      : "rgb(255, 0, 0, 0.8)";
  chartBackgroundColor.value =
    lastSparklineValue.value > firstSparklineValue.value
      ? "rgba(60, 179, 113, 0.2)"
      : "rgba(255, 0, 0, 0.2)";
});
</script>
