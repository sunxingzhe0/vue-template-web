<template>
  <router-view></router-view>
</template>
<script>
export default {
  meta: {
    auth: false,
    title: "基础配置",
    sort: 1,
    redirect: "/baseConfig/dataSource"
  }
};
</script>
<style lang="scss" scoped></style>
