<template>
    <div>
        <div class="con-wrap" :class="{conCollapse: isCollapse}">
            <!-- 这是组件要插入的地方 -->
            <router-view class="page-component-wrap animated fadeIn"></router-view>
        </div>
    </div>
</template>
<script>
export default {
  name: 'layout',
  computed: {
    isCollapse() {
      return this.$store.state.common.isCollapse
    }
  }
}
</script>
<style lang="scss" scoped>
.con-wrap {
  padding-left: 180px;
  transition: all 0.3s;
  h3 {
    margin-top: 0;
    color: #324157;
  }
  .page-component-wrap {
    padding: 10px;
  }
}
.con-wrap.conCollapse {
  padding-left: 64px;
  transition: all 0.3s;
}
</style>

