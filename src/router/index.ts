// Composables
import { createRouter, createWebHistory } from "vue-router";

import DefaultView from "@/layouts/default/Default.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import RateLimitView from "@/views/RateLimitView.vue";
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
        path: "/:pathMatch(.*)*",
        name: "NotFoundView",
        component: NotFoundView,
      },
      {
        path: "/rateLimit",
        name: "RateLimitView",
        component: RateLimitView,
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
