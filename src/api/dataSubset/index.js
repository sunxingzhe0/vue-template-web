import request from "@/utils/request";

//查询数据集列表
export function datasetList(params) {
  return request({
    url: "/api/v1/dataset",
    method: "get",
    params,
  });
}

//查询分组列表
export function groupListAll(params) {
  return request({
    url: "/api/v1/dataset/group/listAll",
    method: "get",
    params,
  });
}

//添加/编辑分组
export function saveGruop(data) {
  return request({
    url: "/api/v1/dataset/group/save",
    method: "post",
    data,
  });
}

//删除分组
export function delGroup(data) {
  return request({
    url: "/api/v1/dataset/group/del",
    method: "post",
    data,
  });
}
//数据源可选项
export function dataSourceListAll(params) {
  return request({
    url: "/api/v1/datasource/listAll",
    method: "get",
    params,
  });
}
//查询数据集详情
export function getDatasetInfo(params) {
  return request({
    url: "/api/v1/dataset/detail",
    method: "get",
    params,
  });
}
//删除单个数据集
export function datasetDel(data) {
  return request({
    url: "/api/v1/dataset/delete",
    method: "post",
    data,
  });
}
//添加数据集
/**
 *
 * @param {Object} data
 * @param {String} data.comments //备注
 * @param {String} data.datasourceId //数据源id
 * @param {String} data.groupId //分组id
 * @param {String} data.name //名称
 * @param {String} data.paramList[0].paramName //参数名称
 * @param {String} data.paramList[0].paramType //参数类型
 * @param {String} data.paramList[0].paramValue //参数值
 */
export function addDataset(data) {
  return request({
    url: "/api/v1/dataset/add",
    method: "post",
    data,
  });
}

//编辑数据集
/**
 *
 * @param {Object} data
 * @param {String} data.comments //备注
 * @param {String} data.datasourceId //数据源id
 * @param {String} data.groupId //分组id
 * @param {String} data.name //名称
 * @param {String} data.paramList[0].paramName //参数名称
 * @param {String} data.paramList[0].paramType //参数类型
 * @param {String} data.paramList[0].paramValue //参数值
 */
export function editDataset(data) {
  return request({
    url: "/api/v1/dataset/edit",
    method: "post",
    data,
  });
}
