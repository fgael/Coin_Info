// Composables
import { createRouter, createWebHistory } from "vue-router";

import DefaultView from "@/layouts/default/Default.vue";
import HomeView from "@/views/HomeView.vue";
import CoinView from "@/views/CoinView.vue";

const routes = [
  {
    path: "/",
    component: DefaultView,
    children: [
      {
        path: "",
        name: "HomeView",
        component: HomeView,
      },
      {
        path: "/coin/:id",
        name: "CoinView",
        component: CoinView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
