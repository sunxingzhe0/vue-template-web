<template>
  <div class="inner-view">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "InnerView"
};
</script>
<style lang="scss" scoped>
.inner-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
