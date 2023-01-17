<template>
  <div class="app-header">
    <div class="header-left">
      <div class="app-logo">
        <img src="@/assets/img/logo.png" alt="" />
      </div>
      <div class="app-company">
        {{ companyName }}
      </div>
      <div class="app-name">{{ appName }}</div>
      <div class="app-back">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-zuo-jian-tou"></use>
        </svg>
      </div>
    </div>
    <div class="header-center">
      <div class="app-time">
        <span>{{ now.date }}</span>
        <span>{{ now.time }}</span>
        <span>{{ now.week }}</span>
      </div>
    </div>
    <div class="header-right">
      <!-- <div class="app-home">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-home"></use>
        </svg>
      </div> -->
      <div class="app-user">
        <div class="app-avatar">
          <img src="@/assets/img/avatar.png" alt="" />
        </div>
        <div class="user-name">
          {{ `${userInfo.name}（${userInfo.username}）` }}
        </div>
      </div>
      <!-- <div class="app-logout">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-logout"></use>
        </svg>
      </div> -->
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { appName, companyName } from "@/config";

export default {
  name: "AppHeader",
  data() {
    return {
      now: {
        date: "",
        time: "",
        week: ""
      },
      appName,
      companyName,
      timmer: null
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.app.userInfo
        ? JSON.parse(this.$store.state.app.userInfo)
        : {};
    }
  },
  created() {
    this.timmer = setInterval(() => this.updateTime(), 1000);
  },
  beforeDestroy() {
    if (this.timmer) clearInterval(this.timmer);
  },
  methods: {
    updateTime() {
      const now = dayjs();
      this.now = {
        date: now.format("YYYY-MM-DD"),
        time: now.format("HH:mm:ss"),
        week: now.format("dddd")
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.app-header {
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0 20px;
  background: #fff;
  align-items: center;
  justify-content: space-between;
}
.header-left {
  display: flex;
  align-items: center;
  .app-logo {
    margin-right: 10px;
    img {
      width: 36px;
      height: 36px;
    }
  }
  .app-company {
    height: 20px;
    font-size: 20px;
    line-height: 20px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    margin-right: 10px;
  }
  .app-name {
    height: 20px;
    background: #ddf8fa;
    border: 1px solid #0ab2c1;
    border-radius: 4px;
    line-height: 10px;
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #0ab2c1;
    padding: 5px 10px;
    margin-right: 20px;
  }
  .app-back {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #e7e7e7;
    display: flex;
    color: #6b6b6b;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
  }
}
.header-center {
  height: 16px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #333333;
  span {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.header-right {
  display: flex;
  align-items: center;
  .app-home {
    width: 20px;
    height: 20px;
    font-size: 20px;
    display: flex;
    cursor: pointer;
    margin-right: 40px;
  }
  .app-user {
    display: flex;
    align-items: center;
    height: 16px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
  }
  .app-avatar {
    margin-right: 10px;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .app-logout {
    font-size: 20px;
    cursor: pointer;
    margin-left: 40px;
  }
}
</style>
