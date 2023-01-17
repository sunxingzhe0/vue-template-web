import Vue from "vue";
import Element from "element-ui";

import "./filters";
import "./directives";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/app.scss";

// require("./mock");

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.locale("zh-cn");
dayjs.extend(updateLocale);
dayjs.updateLocale("zh-cn", {
  weekdays: [
    "星期天",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ]
});

Vue.use(Element);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
