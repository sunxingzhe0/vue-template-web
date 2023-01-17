<template>
  <div id="app">
    <InnerView class="layot">
      <SideBar></SideBar>
      <InnerView class="main-view">
        <AppHeader></AppHeader>
        <RouteView>
          <BreadCrumb></BreadCrumb>
          <transition :name="transition">
            <router-view class="child-view"></router-view>
          </transition>
        </RouteView>
      </InnerView>
    </InnerView>
  </div>
</template>
<script>
import { RouteView, InnerView } from "@/components/Layout";
import { SideBar, AppHeader, BreadCrumb } from "@/components/App";
export default {
  meta: {
    title: "菜单1-2",
    activeMenu: "/home"
  },
  name: "layout-ih",
  components: {
    SideBar,
    AppHeader,
    RouteView,
    InnerView,
    BreadCrumb
  },
  data() {
    return {
      transition: "",
      lastRouteIndex: 0
    };
  },
  watch: {
    $route(val) {
      const index = val?.meta?.index || 0;
      if (val.meta.index >= this.lastRouteIndex) {
        this.transition = "right-slide-in";
      } else {
        this.transition = "left-slide-in";
      }
      this.lastRouteIndex = index;
    }
  }
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}
html,
body,
#app {
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  display: flex;
}
.layot {
  display: flex;
}
.main-view {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.iconfont {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.child-view {
  width: 100%;
  position: absolute;
  transition: all 0.8s cubic-bezier(0.55, 0, 0.1, 1);
}

.right-slide-in-enter {
  opacity: 0;
  transform: translate(20%, 0);
}
.right-slide-in-leave-active {
  opacity: 0;
}

.left-slide-in-enter {
  opacity: 0;
  transform: translate(-20%, 0);
}
.left-slide-in-leave-active {
  opacity: 0;
}
</style>
