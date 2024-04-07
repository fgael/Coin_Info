<template>
  <v-card class="rounded-xl" elevation="0">
    <Line
      v-if="!isLoading"
      :data="chartData"
      :options="chartOptions"
      :style="chartStyle"
    />
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

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

const entryProps = defineProps<{
  sparkline: number[] | null;
}>();

const isLoading = ref(true);
// const lastSparklineValue = ref(0);
// const firstSparklineValue = ref(0);
const chartLineColor = ref("rgba(60, 179, 113, 1)");
const chartBackgroundColor = ref("rgba(60, 179, 113, 1)");
// const sparklineMin1Percent = ref(0);
// const sparklineMax1Percent = ref(0);

// Graph data
const chartData = computed(() => {
  if (entryProps.sparkline && entryProps.sparkline.length > 0) {
    const startHour = new Date();
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
          data: entryProps.sparkline,
          borderColor: chartLineColor.value,
          backgroundColor: chartBackgroundColor.value,
          fill: true,
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
  plugins: {
    legend: {
      display: false,
    },
  },
  layout: {
    padding: {
      left: 50,
      right: 20,
      top: 30,
      bottom: 10,
    },
  },
  responsive: false,
  maintainAspectRatio: false,
  scales: {
    // y: {
    //   min: sparklineMin1Percent.value,
    //   max: sparklineMax1Percent.value,
    // },
    x: {
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

onMounted(async () => {
  chartLineColor.value =
    lastSparklineValue.value > firstSparklineValue.value
      ? "rgba(60, 179, 113, 0.8)"
      : "rgb(255, 0, 0, 0.8)";
  chartBackgroundColor.value =
    lastSparklineValue.value > firstSparklineValue.value
      ? "rgba(60, 179, 113, 0.2)"
      : "rgba(255, 0, 0, 0.2)";

  isLoading.value = false;
  // const sparklineMaxValue = Math.max(...sparkline.value.flat());
  // const sparklineMinValue = Math.min(...sparkline.value.flat());
  // sparklineMin1Percent.value = sparklineMinValue * 0.99;
  // sparklineMax1Percent.value = sparklineMaxValue * 1.01;
});
</script>
