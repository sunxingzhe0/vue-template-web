import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

Vue.use(Vuex);

const modules = {};
const requireContext = require.context("./", true, /^\.\/.*\/index\.js$/);
requireContext.keys().forEach(key => {
  const _module = requireContext(key);
  modules[key.slice(2, -9)] =
    _module.__esModule && _module.default ? _module.default : _module;
});

export default new Vuex.Store({
  getters,
  state: {},
  actions: {},
  mutations: {},
  modules: modules
});
