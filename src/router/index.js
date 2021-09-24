import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
});

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  let user = localStorage.getItem("uid");

  if (requiresAuth && !user) {
    next("/");
  } else if (requiresAuth && user) {
    next();
  } else {
    next();
  }
});

export default router;
