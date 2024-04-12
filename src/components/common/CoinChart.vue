<template>
  <div v-if="entryProps.sparkline">
    <v-card class="rounded-lg" elevation="0">
      <v-card-title class="d-flex align-center">
        <v-icon icon="mdi mdi-chart-pie" color="green" class="my-2" />
        <p class="ml-2">7 Day Chart</p>
      </v-card-title>
      <Line :data="chartData" :options="chartOptions" :style="chartStyle" />
    </v-card>
  </div>
  <div v-else>
    <v-skeleton-loader type="list-item-three-line@6" class="py-4" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Tooltip,
  Legend,
  Filler
);

const entryProps = defineProps<{
  sparkline: number[] | null;
}>();

// Graph data
const chartData = computed(() => {
  if (entryProps.sparkline && entryProps.sparkline.length > 0) {
    const startHour = new Date();
    const hoursPassed = [];

    const options: Intl.DateTimeFormatOptions = {
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
          data: entryProps.sparkline,
          borderColor: chartLineColor.value,
          backgroundColor: chartBackgroundColor.value,
          fill: true,
          borderWidth: 3,
          pointRadius: 2,
        },
      ],
    };
  } else {
    return {
      labels: [],
      datasets: [],
    };
  }
});

const chartOptions = computed(() => ({
  elements: {
    line: {
      tension: 0.1,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  layout: {
    padding: {
      left: 20,
      right: 20,
      bottom: 10,
    },
  },
  responsive: false,
  maintainAspectRatio: false,
  scales: {
    y: {
      suggestedMin: entryProps.sparkline
        ? Math.min(...entryProps.sparkline) * 0.99
        : 0,
    },
    x: {
      suggestedMax: entryProps.sparkline
        ? Math.max(...entryProps.sparkline) * 1.01
        : 0,
      grid: {
        display: false,
      },
    },
  },
}));

const chartStyle = computed(() => ({
  height: "50vh",
  width: "100%",
}));

const lastSparklineValue = computed(() => {
  if (entryProps.sparkline && entryProps.sparkline.length > 0) {
    return entryProps.sparkline[entryProps.sparkline.length - 1];
  } else {
    return 0;
  }
});

const firstSparklineValue = computed(() => {
  if (entryProps.sparkline && entryProps.sparkline.length > 0) {
    return entryProps.sparkline[0];
  } else {
    return 0;
  }
});

const chartLineColor = computed(() => {
  return lastSparklineValue.value > firstSparklineValue.value
    ? "rgba(35, 128, 0, 0.8)"
    : "rgba(255, 58, 58, 0.8)";
});

const chartBackgroundColor = computed(() => {
  return lastSparklineValue.value > firstSparklineValue.value
    ? "rgba(60, 179, 113, 0.2)"
    : "rgba(255, 0, 0, 0.2)";
});
</script>
