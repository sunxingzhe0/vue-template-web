const Mock = require("mockjs");
let services = require.context("./services/", true, /\.js$/); //引入services内所有js
services.keys().forEach(key => {
  services(key); //生成modal
});

Mock.setup({
  timeout: 800 // setter delay time
});
