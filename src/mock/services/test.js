import Mock from "mockjs";
import { builder } from "../util";
//
const tagCloudData = () => {
  return builder([
    { value: 9, name: "AntV" },
    { value: 2, name: "董珊珊" },
    { value: 2, name: "陆沉" },
    { value: 2, name: "顾倾" },
    { value: 2, name: "统计图表" }
  ]);
};
Mock.mock("/mock/tagCloudData", "get", tagCloudData);

const userInfo = () => {
  return builder({
    name: "杜升",
    status: "存活",
    age: 23
  });
};
Mock.mock("/mock/userInfo", "get", userInfo);
