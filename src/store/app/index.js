import { apiLogin } from "@/api/baseConfig/index";
import { setToken } from "@/utils/auth";
export default {
  namespaced: true,
  state: {
    token: "",
    userInfo: window.sessionStorage.getItem("userInfo"),
  },
  actions: {
    handelLogin({ commit }, userInfo) {
      return new Promise(async (resolve, reject) => {
        // const { username, password } = userInfo; //用户输入信息
        try {
          const res = await apiLogin({
            username: "admin",
            password: "123456",
          });
          commit("SET_TOKEN", res.token);
          setToken(res.token);
          commit("SET_USERINFO", res ? JSON.stringify(res) : "");
          window.sessionStorage.setItem(
            "userInfo",
            res ? JSON.stringify(res) : ""
          );
          resolve();
        } catch (error) {
          reject();
        }
      });
    },
  },
  mutations: {
    SET_TOKEN: (state, palod) => {
      state.token = palod;
    },
    SET_USERINFO: (state, palod) => {
      state.userInfo = palod;
    },
  },
};
