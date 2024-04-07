// Composables
import { createRouter, createWebHistory } from "vue-router";

import DefaultView from "@/layouts/default/Default.vue";
import Home from "@/views/Home.vue";
import CoinDetail from "@/views/CoinDetail.vue";

const routes = [
  {
    path: "/",
    component: DefaultView,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "/coin/:id",
        name: "CoinDetail",
        component: CoinDetail,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
