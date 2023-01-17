<script>
import { companyName } from "@/config";
import { asyncRoutes } from "@/router";
import logo from "@/assets/img/logo.png";

export default {
  name: "SideBar",
  data() {
    return {
      companyName
      // logo: require("@/assets/img/logo.png"),
    };
  },
  computed: {
    menus() {
      return asyncRoutes;
    },
    activeMenu() {
      return "/" + this.$route.path;
    }
  },
  methods: {
    routeTo(paths) {
      const topath = paths.substr(1);
      this.$router.push(topath);
      return;
      let path = "";

      let route = this.menus;
      indexs = indexs.split("-");
      indexs.forEach(index => {
        route = route[index] || route.children[index];
        if (/^\//.test(route.path)) {
          path = path + route.path;
        } else {
          path = path + "/" + route.path;
        }
      });
      this.$router.push(path);
    },
    renderMenus(menus, path = "") {
      return menus.map((item, index) => {
        return item.children ? (
          <el-submenu
            index={path + "/" + item.path}
            key={path + "/" + item.path}
          >
            <template slot="title">
              <span slot="title">{item.meta.title}</span>
            </template>
            {item.children
              ? this.renderMenus(item.children, path + "/" + item.path)
              : null}
          </el-submenu>
        ) : (
          <el-menu-item
            key={item.path}
            index={String(path + "/" + item.path)}
            onClick={() => this.routeTo(String(path + "/" + item.path))}
          >
            <template slot="title">
              <span slot="title">{item.meta.title}</span>
            </template>
          </el-menu-item>
        );
      });
    }
  },
  render() {
    const filterMenus = ["/login"];
    const menus = this.menus.filter(v => !filterMenus.includes(v.path));
    const companyName = this.companyName;
    return (
      <div class="side-bar">
        <div class="side-bar-header">
          <div class="app-logo">
            <img src={logo} alt="" />
          </div>
          <div class="app-company">{companyName}</div>
        </div>
        <div class="side-bar-body">
          <el-menu isCollapse={true} default-active={this.activeMenu}>
            {this.renderMenus(menus)}
          </el-menu>
        </div>
      </div>
    );
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

.side-bar {
  width: 200px;
  display: flex;
  flex-direction: column;
}
.side-bar-header {
  border-bottom: 2px solid #e6e6e6;
  .app-logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    /* background: $--color-primary; */
    margin: 50px 50px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 32px;
      height: 32px;
    }
  }
  .app-company {
    height: 20px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    text-align: center;
    line-height: 20px;
    margin-bottom: 50px;
  }
}
.side-bar-body {
  flex: 1;
  overflow: auto;
  margin-top: 20px;
  &::v-deep {
    li {
      height: 60px;
      line-height: 60px;
    }
    .el-submenu .el-menu {
      background: #f7f7f7;
    }
    .el-menu-item.is-active {
      background: #def7f9;
    }
  }
}
</style>
