import Vue from "vue";
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(() => {});
};

Vue.use(VueRouter);

const recursion = function(paths, root, requireContext) {
  const dirs = paths.map(item => item.split("/")[0]);
  const sets = Array.from(new Set(dirs));
  const router = sets.map(it => {
    const reg = new RegExp("^" + it + "/");
    const _paths = paths
      .filter(item => item !== it)
      .filter(item => reg.test(item))
      .map(item => item.substring(it.length + 1));
    const component = requireContext(root + it + "/index.vue").default;
    const children = recursion(_paths, root + it + "/", requireContext);
    const routerItem = {
      path: it,
      children,
      component,
      name: component.name || it,
      meta: component.meta || {},
      redirect: component.meta?.redirect
    };
    if (!routerItem.children.length) delete routerItem.children;
    if (!routerItem.redirect === undefined) delete routerItem.redirect;
    return routerItem;
  });
  return router;
};

const genRouter = function(requireContext) {
  // 不读取components文件夹下的文件
  const paths = requireContext
    .keys()
    .map(item => item.slice(2, -10))
    .filter(item => !/components/.test(item));
  const filterRoutes = [];
  const router = recursion(paths, "./", requireContext)
    .map(item => ({
      ...item,
      path: "/" + item.path
    }))
    .filter(v => !filterRoutes.includes(v.path));
  return router;
};

const routes = [
  {
    path: "",
    redirect: "/login/index"
  }
];

const requireContext = require.context(
  "@/views/",
  true,
  /^\.\/.*\/index\.vue$/
);

const asyncRoutes = genRouter(requireContext);

const router = new VueRouter({
  routes: routes,
  base: process.env.BASE_URL
});

router.addRoutes(asyncRoutes);

export default router;
export { asyncRoutes };
