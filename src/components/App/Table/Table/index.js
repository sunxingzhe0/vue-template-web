import Vue from "vue";
import { mergeData } from "vue-functional-data-merge";
import adaptiveTable from "@/directives/el-table";
Vue.directive("adaptive-table", adaptiveTable);

import TableFilter from "../TableFilter";
import TableColumn from "../TableColumn";
import TableFooterTool from "../TableFooterTool";

import variables from "@/assets/css/variables.scss";
import "./index.scss";

export function resolveHeader(headers, columns) {
  this.table.checkedColumns = this.table.checkedColumns || [];
  return headers.reduce((_, item) => {
    if (columns[item.dataField]?.hidden) {
      return _;
    }

    return _.concat({
      ...(columns[item.dataField] || {}),
      prop: columns[item.dataField]?.prop ?? item.field,
      ...(typeof columns[item.dataField]?.formatter === "function"
        ? { formatter: columns[item.dataField].formatter }
        : item.dataField !== item.field
        ? { formatter: row => row[item.dataField] }
        : {}),
      label: columns[item.dataField]?.label ?? item.fieldName,
      sortable:
        columns[item.dataField]?.sortable ?? (item.sorted ? "custom" : false),
      checked:
        this.table.checkedColumns.find(
          ({ prop }) => prop === item.dataField || prop === item.field
        )?.checked ??
        (item.fixed || columns[item.dataField]?.checked) ??
        true,
      disabled: item.fixed ?? columns[item.dataField]?.disabled ?? false
    });
  }, []);
}

function resolveColumnChange(val) {
  this.table.checkedColumns.splice(0, this.table.checkedColumns.length, ...val);
  this.table.tableData.list = this.table.tableData.list.concat();
  this.$nextTick(() => {
    Array.prototype.concat(this.$refs.table).forEach(_ => {
      _.doLayout?.();
    });
  });
}

function handleError(arg) {
  throw new Error(`未处理的事件: ${arg}`);
}

/* eslint-disable no-undef */
export default ({
  props,
  /* children, */
  slots,
  scopedSlots,
  data,
  parent,
  listeners
  /* injections, */
}) => {
  const {
    columns,
    filter,
    hasExport,
    bats,
    popoverWidth,
    alwaysShowBtn,
    treeSet,
    pageProps
  } = props;
  const footerToolHeight = 47;
  const bottomOffset =
    props.bottomOffset ??
    Number.parseInt(variables.bottomOffset) + footerToolHeight;
  const tableData = props.tableData?.props?.tableData ?? props.tableData;
  const tableColumns = resolveHeader.call(parent, tableData.headers, columns);
  const showSelection =
    props.showSelection ||
    props.showSelection === "" ||
    bats?.length >= 0 ||
    hasExport ||
    hasExport === "";
  const disableBottomOffset =
    props.disableBottomOffset || props.disableBottomOffset === "";

  return (
    <div class="c__list">
      {filter && (
        <TableFilter
          {...mergeData(
            {
              model: data.model,
              props: { popoverWidth, data: filter, alwaysShowBtn }
            },
            props.filterData ?? {}
          )}
        />
      )}
      <el-table
        size="medium"
        class="table-wrap"
        ref="table"
        row-key={treeSet?.key ? treeSet.key : ""}
        tree-props={{ children: treeSet?.props ? treeSet.props : "children" }}
        height="74vh"
        data={tableData.list}
        cell-class-name={parent.$_resolveCellClassName}
        on-cell-click={parent.$_handleCellClick}
        on-selection-change={parent.$_selectionChange}
        on-sort-change={parent.$_sortChange}
        on-expand-change={listeners.expandChange || handleError}
        {...mergeData(
          {
            directives: disableBottomOffset
              ? []
              : [{ name: "adaptive-table", value: { bottomOffset } }]
          },
          props.tableData ?? {}
        )}
      >
        {showSelection && (
          <el-table-column
            type="selection"
            width="45"
            align="center"
          ></el-table-column>
        )}

        <el-table-column type="index" label="序号" width="80"></el-table-column>

        {tableColumns.length
          ? tableColumns.reduce(
              (_, { checked, ...props }) =>
                checked
                  ? _.concat(
                      <el-table-column
                        key={props.prop}
                        {...{ attrs: props }}
                        show-overflow-tooltip
                        scopedSlots={
                          props.prop.indexOf("slot") < 0 && checked
                            ? {}
                            : {
                                default: _ => scopedSlots[props.prop](_)
                              }
                        }
                      ></el-table-column>
                    )
                  : _,
              []
            )
          : Array.from({ length: 10 }).map(() => (
              <el-table-column label="加载中"></el-table-column>
            ))}

        {typeof scopedSlots?.fixed === "function" && (
          <el-table-column
            fixed="right"
            {...{ attrs: columns.fixed }}
            scopedSlots={{ default: _ => scopedSlots?.fixed(_) }}
          >
            <template slot="header">
              {columns.fixed?.label || "操作"}
              <TableColumn
                columns={tableColumns}
                on-change={resolveColumnChange.bind(parent)}
              />
            </template>
          </el-table-column>
        )}
      </el-table>

      <TableFooterTool
        table-ref={showSelection && parent.$refs.table}
        has-export={hasExport}
        bats={bats}
        pageProps={pageProps}
        total={tableData.total}
        done={tableData.done}
        isList
        on-command={listeners.handleCommand || handleError}
        {...mergeData({ model: data.model }, props.toolData ?? {})}
      >
        {slots().footertool}
      </TableFooterTool>
    </div>
  );
};
