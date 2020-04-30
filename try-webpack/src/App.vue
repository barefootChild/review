<template>
  <div id="main">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: 'hello vue'
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