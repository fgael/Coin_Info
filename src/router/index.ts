// Composables
import { createRouter, createWebHistory } from "vue-router";

import DefaultView from "@/layouts/default/Default.vue";
import HomeView from "@/views/HomeView.vue";
import CoinDetailView from "@/views/CoinDetailView.vue";

const routes = [
  {
    path: "/",
    component: DefaultView,
    children: [
      {
        path: "",
        name: "Home",
        component: HomeView,
      },
      {
        path: "/coin/:id",
        name: "CoinDetail",
        component: CoinDetailView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
