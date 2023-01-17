import Mock from "mockjs";
//危重患者列表接口
Mock.mock(new RegExp("/mock/api/v1/critical/findList"), "get", {
  危重患者数据: "",
  state: true,
  message: "SUCCESS",
  body: {
    表头数据: "",
    headers: [
      {
        field: "index",
        dataField: "index",
        fieldName: "序号",
        fixed: true,
        sorted: false,
        index: 1
      },
      {
        field: "name",
        dataField: "name",
        fieldName: "姓名",
        fixed: true,
        sorted: false,
        index: 2
      },
      {
        field: "sex",
        dataField: "sex",
        fieldName: "性别",
        fixed: true,
        sorted: false,
        index: 3
      },
      {
        field: "age",
        dataField: "age",
        fieldName: "年龄",
        fixed: true,
        sorted: false,
        index: 4
      },
      {
        field: "rtime",
        dataField: "rtime",
        fieldName: "入院日期",
        fixed: true,
        sorted: false,
        index: 5
      },
      {
        field: "ctime",
        dataField: "ctime",
        fieldName: "出院日期",
        fixed: true,
        sorted: false,
        index: 6
      },
      {
        field: "rdept",
        dataField: "rdept",
        fieldName: "入院科室",
        fixed: true,
        sorted: false,
        index: 7
      },
      {
        field: "cdept",
        dataField: "cdept",
        fieldName: "出院日期",
        fixed: true,
        sorted: false,
        index: 8
      },
      {
        field: "state",
        dataField: "state",
        fieldName: "状态",
        fixed: true,
        sorted: false,
        index: 9
      },
      {
        field: "startTime",
        dataField: "startTime",
        fieldName: "开始时间",
        fixed: true,
        sorted: false,
        index: 10
      },
      {
        field: "info",
        dataField: "info",
        fieldName: "诊断",
        fixed: true,
        sorted: false,
        index: 11
      },
      {
        field: "doctor",
        dataField: "doctor",
        fieldName: "管床医生",
        fixed: true,
        sorted: false,
        index: 12
      }
    ],
    pages: 1,
    total: 1,
    pageNum: 1,
    pageSize: 20,
    list: [
      {
        index: "1",
        name: "赵晓峰",
        sex: "男",
        age: "42岁",
        rtime: "2020-06-25",
        ctime: "2020-06-25",
        rdept: "急诊科",
        cdept: "急诊科",
        state: "紧急",
        startTime: "2020-06-25",
        info: "腿部骨质坏死",
        doctor: "王晓梅"
      },
      {
        index: "2",
        name: "赵晓峰",
        sex: "男",
        age: "42岁",
        rtime: "2020-06-25",
        ctime: "2020-06-25",
        rdept: "急诊科",
        cdept: "急诊科",
        state: "紧急",
        startTime: "2020-06-25",
        info: "腿部骨质坏死",
        doctor: "王晓梅"
      },
      {
        index: "3",
        name: "赵晓峰",
        sex: "男",
        age: "42岁",
        rtime: "2020-06-25",
        ctime: "2020-06-25",
        rdept: "急诊科",
        cdept: "急诊科",
        state: "紧急",
        startTime: "2020-06-25",
        info: "腿部骨质坏死",
        doctor: "王晓梅"
      }
    ],
    prePage: 0,
    nextPage: 0,
    extData: {}
  },
  cause: null
});
//追踪详情
Mock.mock(new RegExp("/mock/api/v1/critical/getInfoDateil"), "get", {
  _comment: "查看追踪详情",
  state: true,
  message: "SUCCESS",
  body: {
    id: "ELME3483494",
    name: "赵明",
    dept: "骨科",
    ward: "传染病区",
    sex: "男",
    age: "36岁",
    rtime: "2020-05-05",
    info: "脚踝骨坏死",
    content: "按时上药",
    doctor: "赵飞燕",
    ftime: "2020-05-25",
    event: "12日车祸",
    type: "骨质坏死",
    states: [
      {
        time: "2020-05-26 12:35",
        name: "刘德华",
        state: "已确认",
        remaks: ""
      },
      {
        time: "2020-05-26 16:45",
        name: "张学友",
        state: "已确认",
        remaks: "请主管医师进行处理"
      }
    ]
  },
  cause: null
});
