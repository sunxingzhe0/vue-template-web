<template>
  <div class="c__filter" @click.stop>
    <!-- <el-col v-if="hasPopover" class="c__filter-switch" :span="3"> -->
    <el-popover
      v-if="hasPopover"
      trigger="manual"
      :width="popoverWidth"
      v-model="isOpen"
      placement="bottom-start"
      transition="el-zoom-in-top"
      :visible-arrow="false"
      :offset="-21"
      :popper-class="
        popoverWidth ? 'c__filter-popper' : 'c__filter-popper no-width'
      "
      @click.stop
    >
      <div class="popper-container">
        <div class="fixedHeightBox">
          <div
            class="item"
            v-for="{ props, data = {}, keys } in data.popover"
            :key="isArray(keys) ? keys.join('') : keys"
          >
            <span
              class="item-label is-right"
              :style="{ width: `${calcWords + 1}em` }"
            >
              {{ props.label }}：
            </span>

            <component
              v-if="props.is"
              :is="props.is"
              :style="props.is === 'el-input' ? { maxWidth: '192px' } : {}"
              size="mini"
              v-bind="data.attrs"
              :pickerOptions="pickerOptions"
              v-on="data.on"
              v-model="values[isArray(keys) ? keys[0] : keys]"
            >
              <slot />
            </component>

            <el-select
              v-else
              size="mini"
              v-bind="data.attrs"
              v-on="data.on"
              v-model="values[keys]"
            >
              <el-option
                v-for="{ label, value, index } in props.options"
                :key="value"
                :label="label"
                :value="index ? index : value"
              ></el-option>
            </el-select>
          </div>
        </div>

        <div class="btns" style="padding-top: 10px;">
          <el-button
            type="primary"
            size="small"
            @click="resolveEmitChange(), (isOpen = false)"
            >搜索</el-button
          >
          <el-button size="small" @click="clearFilterData('popover')">
            清空
          </el-button>
        </div>
      </div>

      <div slot="reference" style="width: 130px;">
        <label for="is-open">{{ data.label || "筛选条件" }}</label>
        <el-switch
          v-model="isOpen"
          id="is-open"
          style="margin-left: 10px;"
        ></el-switch>
      </div>
    </el-popover>
    <!-- </el-col> -->

    <!-- <el-col :span="hasPopover ? 21 : 24"> -->
    <el-row style="display:flex;">
      <el-col :span="data.inline.length > 3 ? 21 : 20">
        <el-row
          :gutter="20"
          style="display:flex;flex-wrap: wrap;margin-left: 0px;margin-right: 0px;"
          :style="data.inline.length > 2 && data.date ? 'flex-wrap:wrap' : ''"
        >
          <el-col
            v-bind="
              alwaysShowBtn
                ? { xs: 24, sm: 6, lg: 6, xl: 7 }
                : {
                    xs: 24,
                    sm: hasDatePicker ? 12 : 24,
                    lg: {
                      span: hasDatePicker ? 10 : 16,
                      offset: hasPopover ? 2 : 2,
                    },
                  }
            "
            v-if="data.search"
          >
            <el-input
              v-if="data.search"
              class="input-with-select"
              v-model="values[data.search.keys[1]]"
              size="small"
              placeholder="请输入内容"
              clearable
              @clear="resolveEmitChange"
              @keyup.native.enter="resolveEmitChange"
            >
              <template v-slot:prepend>
                <el-select
                  class="prepend-select"
                  v-model="values[data.search.keys[0]]"
                  size="small"
                  placeholder="请选择"
                  @change="values[data.search.keys[1]] = ''"
                >
                  <el-option
                    v-for="{ label, value } in data.search.props.options"
                    :key="value"
                    :label="label"
                    :value="value"
                  ></el-option>
                </el-select>
              </template>
              <template v-slot:append>
                <el-button
                  icon="el-icon-search"
                  @click="resolveEmitChange"
                ></el-button>
              </template>
            </el-input>
          </el-col>

          <div
            v-for="{ props, listeners, keys } in data.inline"
            :key="isArray(keys) ? keys.join('') : keys"
            :class="
              props.label.length > 5 && data.inline.length == 4
                ? 'label-inline'
                : data.inline.length >= 4
                ? 'more-inline c__filter-inline'
                : 'c__filter-inline'
            "
          >
            <div v-show="props.hidden" style="width: 100%; height: 32px;"></div>
            <span
              class="item-label is-right"
              v-show="!props.hidden"
              :style="{ width: `${calcWords + 1}em` }"
              >{{ props.label }}：</span
            >

            <component
              v-if="props.is !== 'el-select'"
              :is="props.is"
              size="small"
              :type="props.type"
              :range-separator="props.separator"
              :start-placeholder="props.start"
              :end-placeholder="props.end"
              v-bind="props.attrs"
              v-on="data.on"
              v-model="values[isArray(keys) ? keys[0] : keys]"
              @keyup.native.enter="resolveEmitChange"
              @change="
                () => {
                  props.is == 'el-date-picker' && resolveEmitChange();
                }
              "
            >
              <slot />
            </component>

            <el-select
              v-else
              size="small"
              v-bind="props.attrs"
              v-on="data.on"
              style="width: 100%;"
              v-model="values[keys]"
            >
              <el-option
                v-for="{ label, value, index } in props.options"
                :key="value"
                :label="label"
                :value="index ? index : value"
              ></el-option>
            </el-select>
          </div>

          <el-col
            v-if="hasDatePicker"
            style="min-width: 530px; flex-shrink: 0;"
            v-bind="
              alwaysShowBtn
                ? {
                    xs: 24,
                    sm: 6,
                    lg: 6,
                    xl: 7,
                  }
                : {
                    xs: 24,
                    sm: 12,
                    lg: hasPopover ? { span: 12 } : 12,
                  }
            "
          >
            <!-- lg: hasPopover ? { span: 10, offset: 2 } : 10, -->
            <template>
              <div class="flex-start-center" style="min-width: 530px;">
                <template v-if="data.date">
                  <el-select
                    class="prepend-select prepend-select-date"
                    v-model="values[data.date.keys[0]]"
                    size="small"
                    @change="values[keys.date.start] && resolveEmitChange()"
                  >
                    <el-option
                      v-for="{ label, value } in data.date.props.options"
                      :key="value"
                      :label="label"
                      :value="value"
                    ></el-option>
                  </el-select>
                  <el-date-picker
                    :offset="-220"
                    v-model="values[keys.date.start]"
                    clearable
                    :type="data.time ? 'daterange' : 'datetimerange'"
                    :format="data.time ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss'"
                    :value-format="data.time ? 'yyyyMMdd' : 'yyyyMMddHHmmss'"
                    size="small"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    v-bind="data.date.props"
                    @change="resolveEmitChange"
                    :default-time="['00:00:00', '23:59:59']"
                  ></el-date-picker>
                </template>

                <el-time-picker
                  v-if="data.time"
                  is-range
                  v-model="values[time.date.start]"
                  range-separator="~"
                  value-format="HHmmss"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                  size="small"
                  @change="resolveEmitChange"
                >
                </el-time-picker>
              </div>
            </template>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="3" class="infoitem" v-if="alwaysShowBtn">
        <el-button size="small" @click="clearFilterData('inline')"
          >重置</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="resolveEmitChange(), (isOpen = false)"
          >搜索</el-button
        >
      </el-col>
    </el-row>
    <!-- </el-col> -->
  </div>
</template>

<script>
import { cloneDeep, isArray } from "lodash";
import InputRange from "./InputRange";

export default {
  name: "TableFilter",
  components: {
    /* eslint-disable-next-line vue/no-unused-components */
    InputRange,
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    popoverWidth: {
      type: [String, Number],
    },
    alwaysShowBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    this.pickerOptions = {
      shortcuts: [
        {
          text: "最近一个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            end.setTime(end.getTime() - 1000);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近三个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 91);
            end.setTime(end.getTime() - 1000);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近半年",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 182);
            end.setTime(end.getTime() - 1000);
            picker.$emit("pick", [start, end]);
          },
        },
      ],
    };

    this.keys = {
      date: {
        start: this.data.date?.keys[1] || "startTime",
        end: this.data.date?.keys[2] || "endTime",
      },
    };
    this.time = {
      date: {
        start: this.data.time?.keys[0] || "beginTime",
        end: this.data.time?.keys[1] || "overTime",
      },
    };
    this.inlinekeys = this.getinlineKeys();
    // {
    //   date: {
    //     start: this.data.date?.keys[1] || 'startTime',
    //     end: this.data.date?.keys[2] || 'endTime',
    //   },
    // }
    return {
      values: {},
      isOpen: false,
    };
  },
  computed: {
    calcWords() {
      return Math.max(
        ...Object.values(this.data).map((_) =>
          isArray(_)
            ? Math.max(..._.map(({ props }) => props.label?.length ?? 0))
            : 0
        )
      );
    },
    hasPopover() {
      return this.data.popover?.length;
    },
    hasDatePicker() {
      return !!this.data.date;
    },
  },
  watch: {
    value: {
      handler: function() {
        this.cacheValue = cloneDeep(this.value);
        this.setDefault(this.cacheValue, false);
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.hiddenPopover = () => {
      this.isOpen = false;
    };

    document.body.addEventListener("click", this.hiddenPopover);
  },
  beforeDestroy() {
    document.body.removeEventListener("click", this.hiddenPopover);
  },
  methods: {
    getinlineKeys() {
      let dateItem = this.data.inline.find(
        (item) => item.props.is == "el-date-picker"
      );
      console.log(dateItem?.keys);
      if (dateItem) {
        return {
          date: {
            start: dateItem.keys[0] || "beginTime",
            end: dateItem.keys[1] || "overTime",
          },
        };
      } else {
        return {
          date: {
            start: "beginDate",
            end: "endDate",
          },
        };
      }
    },
    isArray,
    setDefault(cacheValue, isClear) {
      // console.log(this.inlinekeys)
      this.need2Split = {
        [this.keys.date.start]: this.keys.date.end,
        [this.time.date.start]: this.time.date.end,
        [this.inlinekeys.date.start]: this.inlinekeys.date.end,
      };
      // console.log(this.need2Split)
      const handleValue = ({ props, keys }) => {
        if (isArray(keys)) {
          ["el-date-picker", "InputRange", "el-time-picker"].includes(
            props.is
          ) && (this.need2Split[keys[0]] = keys[1]);

          return keys.map((key, index) =>
            this.need2Split.key
              ? [key, [cacheValue[key], cacheValue[keys[index + 1]]]]
              : [key, cacheValue[key]]
          );
        } else {
          return [[keys, cacheValue[keys]]];
        }
      };
      // console.log(this.values)
      // console.log(this.value)
      // console.log(this.keys.date.start)
      // console.log(this.keys.date.end)
      // console.log(this.values[this.keys.date.start])
      this.values = {
        ...this.value,
        ...Object.fromEntries(
          Object.values(this.data).reduce(
            (r, value) =>
              r.concat(
                isArray(value)
                  ? value.reduce((_, value) => _.concat(handleValue(value)), [])
                  : handleValue(value)
              ),
            []
          )
        ),
        [this.keys.date.start]:
          !isClear && this.value[this.keys.date.start]
            ? [this.value[this.keys.date.start], this.value[this.keys.date.end]]
            : null,
        [this.keys.date.end]:
          !isClear && this.value[this.keys.date.start]
            ? this.value[this.keys.date.end]
            : null,
        [this.time.date.start]:
          !isClear && this.value[this.time.date.start]
            ? [this.value[this.time.date.start], this.value[this.time.date.end]]
            : null,
        [this.time.date.end]:
          !isClear && this.value[this.time.date.end]
            ? this.value[this.time.date.end]
            : null,

        [this.inlinekeys.date.start]:
          !isClear && this.value[this.inlinekeys.date.start]
            ? [
                this.value[this.inlinekeys.date.start],
                this.value[this.inlinekeys.date.end],
              ]
            : null,
        [this.inlinekeys.date.end]:
          !isClear && this.value[this.inlinekeys.date.start]
            ? this.value[this.inlinekeys.date.end]
            : null,
      };
      // console.log(this.values)
      //拼接项回显
      Object.entries(this.values).forEach(([key]) => {
        if (key.indexOf("+") > 0) {
          this.values[key] =
            this.values[key.split("+")[0]] && this.values[key.split("+")[1]]
              ? this.values[key.split("+")[0]] +
                "+" +
                this.values[key.split("+")[1]]
              : "";
          delete this.values[key.split("+")[0]];
          delete this.values[key.split("+")[1]];
        }
      });
      isClear && this.$emit("change", cacheValue);
    },
    resolveEmitChange() {
      const data = cloneDeep(this.values);
      data.current = 1;
      console.log(this.values);
      console.log(this.need2Split);
      Object.entries(data).forEach(([key, value]) => {
        isArray(value) &&
          this.need2Split[key] &&
          ([data[key], data[this.need2Split[key]]] = value);

        if (!value && this.need2Split[key]) {
          data[this.need2Split[key]] = null;
        }
        //分开拼接项
        if (key.indexOf("+") > 0) {
          data[key.split("+")[0]] = value.split("+")[0];
          data[key.split("+")[1]] = value.split("+")[1];
          delete data[key];
        }
      });
      this.$emit("change", data);
    },

    clearFilterData(prop) {
      //这段用于去除不可清除的项（如全部订单中的接收方）
      let canClearData = Object.values(this.data[prop]);
      for (let i = canClearData.length - 1; i >= 0; i--) {
        if (canClearData[i].canNotClear) {
          canClearData.splice(i, 1);
        }
      }
      // 将prop的所有项设置值为空并复制（覆盖）到this.values里
      const data = canClearData
        .map(({ keys }) => keys)
        .flat()
        .reduce((r, value) => r.concat([[value, ""]]), []);
      Object.assign(this.values, Object.fromEntries(data), {
        current: 1,
      });
      //这段是用来拆分startTime类似的数组的
      Object.entries(this.values).forEach(([key, value]) => {
        isArray(value) &&
          this.need2Split[key] &&
          ([this.values[key], this.values[this.need2Split[key]]] = ["", ""]);
      });

      // 系统消息情况特殊条件判断
      if (this.values.readType == "") {
        this.values.readType = 0;
      }
      this.$emit("change", this.values);
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/variables.scss";
$select-width: 100px;

.c__filter {
  display: flex;
  align-items: center;
  width: 100%;
  .prepend-select {
    width: $select-width;
  }

  .prepend-select-date {
    vertical-align: top;

    .el-input__inner {
      margin-right: -1px;
      width: calc(#{$select-width} + 1px);
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right-color: transparent;
    }

    & + .el-input__inner {
      width: calc(100% - #{$select-width});
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
}

.c__filter-switch {
  display: flex;
  align-items: center;
  height: 32px;

  label {
    padding-right: 16px;
    font-size: 14px;
    color: #646464;
  }
}

.c__filter-popper {
  margin-top: 6px !important;
  box-shadow: 0 6px 4px -4px rgba(0, 0, 0, 0.1) !important;
  border-radius: 0;
  border: none;
  padding-left: 20px;
  padding-right: 20px;

  &.no-width {
    right: $app-router-view-margin;
  }

  .popper-container {
    padding: 0 130px;

    .item {
      display: flex;
      align-items: center;
    }
    .fixedHeightBox {
      max-height: 60vh;
      overflow-y: auto;
      > div + div {
        margin-top: 10px;
      }
    }
  }

  .item-label {
    display: inline-block;
    margin-right: 10px;
    width: 5em;
  }
}
.more-inline {
  width: 33.3%;
  .el-input__inner {
    width: 100% !important;
  }
}

.c__filter-inline {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
  padding-right: 15px;
  box-sizing: border-box;

  .item-label {
    display: inline-block;
    margin-right: 10px;
    width: 5em;
    white-space: nowrap;
    font-size: 14px;
    text-align: left;
  }
}
.infoitem {
  display: flex;
  align-items: flex-end;
  padding-bottom: 10px;
  box-sizing: border-box;
  justify-content: flex-end;
  .el-button {
    width: 70px;
  }
}
</style>
