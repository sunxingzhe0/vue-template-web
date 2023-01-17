import request from "@/utils/request";

export function apiLogin(data) {
  return request({
    url: "/api/v1/login",
    method: "post",
    data,
  });
}
//获取源数据配置列表
export function datasourceList(params) {
  return request({
    url: "/api/v1/datasource",
    method: "get",
    params,
  });
}
//数据源配置row详情{prams:id}
export function datasourceInfo(params) {
  return request({
    url: "/api/v1/datasource/get",
    method: "get",
    params,
  });
}
//新增数据源
/**
 *
 * @param {object} data
 * @param {string} data.datasourceType //类型  DB
 * @param {string} data.datasourceName //名称
 * @param {string} data.datasource  //数据库类型
 * @param {string} data.configInfo //服务地址配置详情 json
 * @param {string} data.comments  //备注
 * @param {string} data.jdbcUsername  //用户名
 * @param {string} data.jdbcPassword //密码
 * @param {number} data.poolSize //连接池
 * @param {number} data.maxThread //最大线程
 * @param {string} data.waitTimeout //等待超时
 * @returns
 */
export function datasourceAdd(data) {
  return request({
    url: "/api/v1/datasource/add",
    method: "post",
    data,
  });
}

//编辑数据源
/**
 *
 * @param {object} data
 * @param {string} data.datasourceType //类型  DB
 * @param {string} data.datasourceName //名称
 * @param {string} data.datasource  //数据库类型
 * @param {string} data.configInfo //服务地址配置详情 json
 * @param {string} data.comments  //备注
 * @param {string} data.jdbcUsername  //用户名
 * @param {string} data.jdbcPassword //密码
 * @param {number} data.poolSize //连接池
 * @param {number} data.maxThread //最大线程
 * @param {string} data.waitTimeout //等待超时
 * @returns
 */
export function datasourceEdit(data) {
  return request({
    url: "/api/v1/datasource/edit",
    method: "post",
    data,
  });
}

//删除数据源
/**
 *
 * @param {object} data
 * @param {string} data.id
 * @returns
 */
export function datasourceDel(data) {
  return request({
    url: "/api/v1/datasource/delete",
    method: "post",
    data,
  });
}

//测试数据源
export function datasourceTest(data) {
  return request({
    url: "/api/v1/datasource/test",
    method: "post",
    data,
  });
}
