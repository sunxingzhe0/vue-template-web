import axios from "axios";
import { MessageBox, Message } from "element-ui";

import store from "@/store";
// import { getToken } from "@/utils/auth";

const url = [
  "/api/v1/app/uploadAppLogo",
  "/api/v1/account/changeAvatar",
  "/api/v1/account/importFromExcel",
  "/api/v1/account/downloadExcelModel",
  "/api/v1/basic/logout"
]; //上传文件接口

// create an axios instance
const service = axios.create({
  timeout: 30000,
  withCredentials: true,
  credentials: "include",
  baseURL: process.env.VUE_APP_BASE_API
});

service.interceptors.request.use(
  config => {
    if (store.getters.token && url.indexOf(config.url) < 0) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers["token"] = getToken();
    } else {
      if (config.url != "/api/v1/basic/logout") {
        config.params = {
          ...config.params
          // token: getToken()
        };
      }
    }
    return config;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    if (response.config.responseType === "blob") return response;
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (res.state !== true) {
      const [code, message] = res.message.split(":");
      /* 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired; */
      /* res.code === 50008 || res.code === 50012 || res.code === 50014 */
      if (code === "AUTH-ERROR-01") {
        // to re-login
        MessageBox.confirm("您已注销，可以留在此页，或重新登录", "确认注销", {
          confirmButtonText: "重新登录",
          cancelButtonText: "留在此页",
          type: "warning"
        }).then(() => {
          store.dispatch("logout");
        });
      } else {
        Message({
          message: message || "Error",
          type: "error",
          duration: 5 * 1000,
          showClose: true
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res.body;
    }
  },
  error => {
    console.error(error);
    Message({
      message:
        error.message === "Request failed with status code 404"
          ? "暂无访问权限，请联系管理员"
          : [
              "timeout of 5000ms exceeded",
              "Network Error",
              "Request failed with status code 404"
            ].includes(error.message)
          ? "网络错误，请稍后再试"
          : error.message,
      type: "error",
      duration: 8 * 1000,
      showClose: true
    });
    return Promise.reject(error);
  }
);

export default service;
