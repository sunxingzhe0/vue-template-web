<template>
  <div class="app-bread-crumb">
    <!-- <router-link class="app-home" to="/baseConfig/dataSource">
      <svg class="iconfont" aria-hidden="true">
        <use xlink:href="#icon-home"></use>
      </svg>
    </router-link> -->
    <el-breadcrumb class="bread-crumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in paths" :key="item.path">
          <router-link :to="item.path">{{ item.meta.title }}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "BreadCrumb",
  computed: {
    paths() {
      const matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      );
      return matched.filter(item => item.meta && item.meta.title);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.app-bread-crumb {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  .app-home {
    display: flex;
    font-size: 20px;
    color: #8d8d8d;
    margin-right: 20px;
    &:hover {
      color: $--color-primary;
    }
  }
  &::v-deep {
    .router-link-active {
      height: 14px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      &:hover {
        color: $--color-primary;
      }
    }
    .el-breadcrumb__separator {
      color: #333333;
      margin: 0;
    }
  }
}
</style>
