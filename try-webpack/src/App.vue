<template>
  <div id="main">
    <router-view></router-view>
  </div>
</template>
<script>
import router from "./router/index";
import generateRoutes from "./router/parse";
export default {
  name: "app",
  created() {
    if (localStorage.menu) {
      const menu = JSON.parse(localStorage.menu);
      const _routes = generateRoutes(menu);
      router.addRoutes(_routes);
    }
  }
}
</script>
<style lang="scss">
@import './assets/scss/global.scss';
#main {
  height: 100%
}
</style>