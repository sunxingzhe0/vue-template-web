<template>
  <div class="route-view">
    <slot></slot>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.route-view {
  flex: 1;
  width: 100%;
  padding: 20px;
  overflow: hidden;
  position: relative;
  background: #f2f2f2;
}
</style>
