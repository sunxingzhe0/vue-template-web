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
      <el-form :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="分组" class="group-item">
          <el-select
            v-model="formData.groupId"
            placeholder="请选择分组"
            filterable
            :filter-method="filterMethod"
          >
            <el-option
              v-for="(item, index) in groupList"
              :key="index"
              :label="item.groupName"
              :value="item.id"
            >
              <span style="float: left">{{ item.groupName }}</span>
              <span
                @click.stop="delGroupComfirm(item)"
                style="float: right; color: #f74a4a; font-size: 13px"
                >删除</span
              >
            </el-option>
          </el-select>
          <el-button @click="addGroup">创建分组</el-button>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="formData.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="数据源">
          <el-select v-model="formData.datasourceId" placeholder="请选择">
            <el-option
              v-for="(item, index) in sourceList"
              :key="index"
              :label="item.datasourceName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SQL"
          ><el-input
            rows="8"
            v-model="formData.querySql"
            type="textarea"
            placeholder="请输入"
          ></el-input
        ></el-form-item>
        <el-form-item label="变量-入参">
          <el-table
            class="type-table"
            :data="formData.paramList"
            border
            style="width: 100%"
          >
            <el-table-column prop="paramName" label="名称" width="180">
              <template slot-scope="{ row }">
                <el-input
                  v-model="row.paramName"
                  placeholder="请输入"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="paramType" label="类型">
              <template slot-scope="{ row }">
                <el-select v-model="row.paramType" placeholder="请选择">
                  <el-option label="字符" value="string"></el-option>
                  <el-option label="数字" value="number"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="paramValue" label="固定值">
              <template slot-scope="{ row }">
                <el-input
                  v-model="row.paramValue"
                  placeholder="请输入"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="amount1" label="操作" width="60">
              <template slot-scope="{ $index }">
                <el-button
                  type="text"
                  style="color: #f74a4a"
                  @click="delTime($index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="addBtn">
            <el-button type="text" @click="addTime">添加</el-button>
          </div>
        </el-form-item>
        <el-form-item label="备注"
          ><el-input
            v-model="formData.comments"
            rows="3"
            type="textarea"
            placeholder="请输入"
          ></el-input
        ></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const pre = {
  groupListData: [],
};
import { Table, TableMixin } from "@/components/App/Table";
import { headers } from "./headers";
import {
  datasetList,
  groupListAll,
  saveGruop,
  addDataset,
  dataSourceListAll,
  editDataset,
  getDatasetInfo,
  datasetDel,
  delGroup,
} from "@/api/dataSubset";
export default {
  meta: {
    title: "数据集",
    activeMenu: "/baseConfig",
  },
  components: {
    Table,
  },
  mixins: [
    TableMixin([
      {
        fetchListFunction: async (params) => {
          const res = await datasetList(params);
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
      groupList: [],
      sourceList: [],
      groupName: "",
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
              label: "关键字搜索",
              is: "el-input",
              attrs: {
                placeholder: "名称/备注",
              },
            },
            keys: "keywords",
          },
          {
            props: {
              label: "分组",
              is: "el-select",
              attrs: {
                // multiple: true,
              },
              options: [
                {
                  label: "全部",
                  value: "",
                },
                ...pre.groupListData.map((_) => ({
                  label: _.groupName,
                  value: _.id,
                })),
              ],
            },
            keys: "groupId",
          },
        ],
      },
      columns: {
        index: {
          hidden: true,
          width: 50,
        },
        datasetGroup: {
          formatter(row) {
            return row.datasetGroup.groupName;
          },
        },
      },
    };
  },
  created() {
    this.initFormData();
    this.getDatasourceList();
    this.getGroupList();
  },
  async beforeRouteEnter(to, form, next) {
    [pre.groupListData] = await Promise.all([groupListAll()]);
    next();
  },
  methods: {
    //删除分组确认
    async delGroupComfirm(item) {
      try {
        const confirm = await this.$confirm("是否删除该分组？", "提示", {
          type: "warning",
        });
        if (confirm !== "confirm") return;
        await delGroup([item.id]);
        this.$message.success("操作成功！");
        this.getGroupList();
      } catch (error) {}
    },
    //获取数据源列表
    async getDatasourceList() {
      this.sourceList = await dataSourceListAll();
    },
    //初始化数据
    initFormData() {
      this.formData = {
        paramList: [
          {
            paramName: "",
            paramType: "",
            paramValue: "",
          },
        ],
      };
    },
    //创建分组
    async addGroup() {
      if (!this.groupName) return this.$message.warning("请输入分组名称");
      await saveGruop({ groupName: this.groupName, patientId: 0, num: 0 });
      this.$message.success("操作成功！");
      this.getGroupList();
      this.groupName = "";
    },
    filterMethod(e) {
      this.groupName = e;
    },
    //获取分组列表
    async getGroupList() {
      this.groupList = await groupListAll();
    },
    delTime(index) {
      this.formData.paramList.splice(index, 1);
    },
    addTime() {
      this.formData.paramList = [
        ...this.formData.paramList,
        {
          name: "",
          type: "",
          value: "",
        },
      ];
    },
    async delRow(row) {
      try {
        const confirm = await this.$confirm(
          `是否对【${row.name}】进行删除？`,
          "提示",
          {
            type: "warning",
          }
        );
        if (confirm != "confirm") return;
        await datasetDel([row.id]);
        this.$message.success("操作成功！");
        this.$_fetchTableData();
      } catch (error) {}
    },
    handleClose() {
      this.dialogVisible = false;
    },
    openEdit(row) {
      this.rowData = row;
      this.dialogTitle = "编辑";
      this.dialogVisible = true;
      this.getRowInfo(row.id);
    },
    addRow() {
      this.dialogVisible = true;
      this.dialogTitle = "新增";
      this.initFormData();
    },
    //获取数据集详情
    async getRowInfo(id) {
      this.formData = await getDatasetInfo({ id });
    },
    async confirmSubmit() {
      const isEdit = this.dialogTitle === "新增" ? false : true;
      try {
        this.dialogVisible = false;
        const params = JSON.parse(JSON.stringify(this.formData));
        console.log(params, "参数------------");
        isEdit ? await editDataset(params) : await addDataset(params);
        this.$message.success("操作成功！");
        this.$_fetchTableData();
      } catch (error) {}
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
.addBtn {
  border: 1px solid #dfe6ec;
  text-align: center;
  border-top: 0;
}
.group-item {
  ::v-deep .el-form-item__content {
    display: flex;
  }
}
</style>
