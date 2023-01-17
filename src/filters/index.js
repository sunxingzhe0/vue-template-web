import Vue from "vue";

Vue.use(Vue => {
  (requireContext => {
    const arr = requireContext.keys().map(requireContext);
    (arr || []).forEach(filter => {
      filter = filter.__esModule && filter.default ? filter.default : filter;
      Object.keys(filter).forEach(key => {
        Vue.filter(key, filter[key]);
      });
    });
  })(require.context("./", true, /^\.\/.*\/index\.js$/));
});
