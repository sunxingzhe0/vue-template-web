<template>
  <div class="main-page">
    <Table
      v-model="query"
      :filter="filter"
      :columns="columns"
      :tableData="tableData"
      :alwaysShowBtn="true"
    >
      <template v-slot:fixed="{ row }">
        <el-button type="text" @click="openEdit(row)">
          编辑
        </el-button>
        <el-button type="text" style="color:#f74a4a" @click="delRow(row)">
          删除
        </el-button>
      </template>
      <template v-slot:footertool>
        <el-button size="medium" type="primary" @click="addRow">
          新增
        </el-button>
      </template>
    </Table>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
    >
      <el-form :model="formData" :rules="rules" label-width="140px">
        <el-form-item label="类型">
          <el-select v-model="formData.datasourceType" placeholder="请选择类型">
            <el-option label="数据库" value="DB"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称"
          ><el-input
            v-model="formData.datasourceName"
            placeholder="请输入"
          ></el-input
        ></el-form-item>
        <el-form-item label="数据库类型">
          <el-radio-group v-model="formData.datasource">
            <el-radio label="oracle">Oracle</el-radio>
            <el-radio label="mysql">Mysql</el-radio>
            <el-radio label="sqlserver">Sqlserver</el-radio>
          </el-radio-group></el-form-item
        >
        <el-form-item
          label="服务地址类型"
          v-if="formData.datasource === 'oracle'"
        >
          <el-radio-group v-model="formData.configInfo.urlType">
            <el-radio label="TNS">TNS</el-radio>
            <el-radio label="SN">服务名</el-radio>
          </el-radio-group></el-form-item
        >
        <el-form-item
          v-if="
            formData.configInfo.urlType === 'SN' ||
              formData.datasource === 'sqlserver'
          "
          label="服务地址"
          ><el-input
            v-model="formData.configInfo.serverUrl"
            placeholder="请输入"
          ></el-input
        ></el-form-item>
        <el-form-item
          v-if="formData.datasource === 'sqlserver'"
          label="数据库名"
          ><el-input
            v-model="formData.configInfo.databaseName"
            placeholder="请输入"
          ></el-input
        ></el-form-item>
        <el-form-item v-if="formData.configInfo.urlType === 'TNS'" label="IP"
          ><el-input
            v-model="formData.configInfo.jdbcIp"
            placeholder="请输入"
          ></el-input
        ></el-form-item>
        <el-form-item
          v-if="
            formData.configInfo.urlType === 'TNS' ||
              formData.datasource === 'mysql'
          "
          label="端口"
          ><el-input
            v-model="formData.configInfo.jdbcPort"
            placeholder="请输入"
          ></el-input
        ></el-form-item>
        <el-form-item
          v-if="
            formData.datasource === 'oracle' &&
              formData.configInfo.urlType === 'TNS'
          "
          label="实例名"
          ><el-input
            v-model="formData.configInfo.instanceName"
            placeholder="请输入"
          ></el-input
        ></el-form-item>
        <el-form-item label="用户名"
          ><el-input
            v-model="formData.jdbcUsername"
            placeholder="请输入"
          ></el-input
        ></el-form-item>
        <el-form-item label="密码"
          ><el-input
            v-model="formData.jdbcPassword"
            placeholder="请输入"
          ></el-input
        ></el-form-item>
        <el-form-item label="连接池Size">
          <div class="flex-between">
            <el-input
              v-model="formData.poolSize"
              placeholder="请输入"
            ></el-input>
            <!-- <span style="margin:0 10px">-</span>
            <el-input
              v-model="formData.poolSize"
              placeholder="请输入"
            ></el-input> -->
          </div>
        </el-form-item>
        <el-form-item label="最大线程数"
          ><el-input
            v-model="formData.maxThread"
            placeholder="请输入"
          ></el-input
        ></el-form-item>
        <el-form-item label="等待超时（毫秒）"
          ><el-input
            v-model="formData.waitTimeout"
            placeholder="请输入"
          ></el-input
        ></el-form-item>

        <el-form-item label="备注"
          ><el-input
            v-model="formData.comments"
            rows="4"
            type="textarea"
            placeholder="请输入"
          ></el-input
        ></el-form-item>
        <el-form-item label=""
          ><el-button @click="testData">校验</el-button></el-form-item
        >
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Table, TableMixin } from "@/components/App/Table";
import {
  datasourceList,
  datasourceInfo,
  datasourceAdd,
  datasourceDel,
  datasourceEdit,
  datasourceTest,
} from "@/api/baseConfig";
import { headers } from "./headers";
export default {
  meta: {
    title: "数据配置源",
    activeMenu: "/baseConfig",
  },
  components: {
    Table,
  },
  mixins: [
    TableMixin([
      {
        fetchListFunction: async (params) => {
          const res = await datasourceList(params);
          return {
            headers,
            list: res.records,
            ...res,
          };
        },
      },
    ]),
  ],
  data() {
    return {
      rowData: {},
      dialogVisible: false,
      dialogTitle: "新增",
      formData: {},
      rules: {},
      query: {
        size: 10,
        current: 1,
      },
      filter: {
        inline: [
          {
            props: {
              label: "类型",
              is: "el-select",
              options: [
                {
                  label: "全部",
                  value: "",
                },
                {
                  label: "Oracle",
                  value: "oracle",
                },
                {
                  label: "Mysql",
                  value: "mysql",
                },
                {
                  label: "Sqlserver",
                  value: "sqlserver",
                },
              ],
            },

            keys: "datasource",
          },
          {
            props: {
              label: "关键字搜索",
              is: "el-input",
              attrs: {
                placeholder: "名称/备注",
              },
            },
            keys: "keywords",
          },
        ],
      },
      columns: {
        index: {
          hidden: true,
          width: 50,
        },
      },
    };
  },
  created() {
    this.initFormData();
  },
  methods: {
    //测试数据源
    async testData() {
      try {
        const params = JSON.parse(JSON.stringify(this.formData));
        params.configInfo = JSON.stringify(params.configInfo);
        await datasourceTest(params);
        this.$message.success("校验成功！");
      } catch (error) {
        // this.$message.error("校验失败！");
      }
    },
    initFormData() {
      this.formData = {
        datasourceType: "DB",
        datasourceName: "",
        datasource: "oracle",
        configInfo: {
          urlType: "TNS",
        },
      };
    },
    //删除当前行
    async delRow(row) {
      try {
        const confirm = await this.$confirm(
          `是否对【${row.datasourceName +
            " | " +
            row.datasource}】 连接配置进行删除？`,
          "提示",
          {
            type: "warning",
          }
        );
        if (confirm != "confirm") return;
        // const idList = JSON.stringify([row.id]);
        await datasourceDel([row.id]);
        this.$message.success("操作成功！");
        this.$_fetchTableData();
        console.log("确认删除");
      } catch (error) {}
    },
    handleClose() {
      this.dialogVisible = false;
    },
    //编辑
    openEdit(row) {
      this.rowData = row;
      this.dialogTitle = "编辑";
      this.dialogVisible = true;
      //获取详情
      this.getdatasourceInfo(row.id);
    },

    addRow() {
      this.dialogVisible = true;
      this.dialogTitle = "新增";
      this.initFormData();
    },
    //confirm
    async confirmSubmit() {
      const isEdit = this.dialogTitle === "新增" ? false : true;
      try {
        this.dialogVisible = false;
        const params = JSON.parse(JSON.stringify(this.formData));
        params.configInfo = JSON.stringify(params.configInfo);
        console.log("参数：", params);
        isEdit ? await datasourceEdit(params) : await datasourceAdd(params);
        this.$message.success("操作成功！");
        this.$_fetchTableData();
      } catch (error) {}
    },
    //获取源数据详情
    async getdatasourceInfo(id) {
      const res = await datasourceInfo({ id });
      this.formData = { ...res, configInfo: JSON.parse(res.configInfo) };
    },
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  padding: 20px;
  background: #fff;
}
.el-select {
  width: 100%;
}
.flex-between {
  display: flex;
  justify-content: space-between;
}
</style>
