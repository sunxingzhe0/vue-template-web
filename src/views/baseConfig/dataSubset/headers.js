export const headers = [
  {
    field: "index",
    dataField: "index",
    fieldName: "序号",
    fixed: true,
    sorted: false,
    index: 1,
  },
  {
    field: "name",
    dataField: "name",
    fieldName: "名称",
    fixed: true,
    sorted: false,
    index: 2,
  },
  {
    field: "datasetGroup",
    dataField: "datasetGroup",
    fieldName: "分组",
    fixed: true,
    sorted: false,
    index: 3,
  },
  {
    field: "createDate",
    dataField: "createDate",
    fieldName: "创建时间",
    fixed: true,
    sorted: false,
    index: 4,
  },
  {
    field: "comments",
    dataField: "comments",
    fieldName: "备注",
    fixed: true,
    sorted: false,
    index: 5,
  },
];

export const res = {
  headers: [
    {
      field: "index",
      dataField: "index",
      fieldName: "序号",
      fixed: true,
      sorted: false,
      index: 1,
    },
    {
      field: "type",
      dataField: "type",
      fieldName: "类型",
      fixed: true,
      sorted: false,
      index: 2,
    },
    {
      field: "name",
      dataField: "name",
      fieldName: "名称",
      fixed: true,
      sorted: false,
      index: 3,
    },
    {
      field: "remark",
      dataField: "remark",
      fieldName: "备注",
      fixed: true,
      sorted: false,
      index: 3,
    },
  ],
  pages: 2,
  total: 20,
  pageNum: 1,
  pageSize: 10,
  list: [
    {
      index: 1,
      id: "1",
      type: "Oracle",
      name: "精卫中心XX接口1",
      remark: "无",
    },
    {
      index: 2,
      id: "2",
      type: "Oracle",
      name: "精卫中心XX接口2",
      remark: "无",
    },
  ],
  prePage: 0,
  nextPage: 2,
  extData: {},
};