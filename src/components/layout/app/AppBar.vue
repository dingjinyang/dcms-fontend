<template>
  <v-app-bar app color="blue darken-3" dark>
    <v-app-bar-nav-icon @click.stop="navIconClick">
      <svg-icon name="menu" />
    </v-app-bar-nav-icon>
    <v-toolbar-title class="ml-0 pl-4">
      <span class="hidden-xs-only">学科竞赛管理系统</span>
    </v-toolbar-title>
    <v-spacer />

    <screen-full />
    <v-btn icon>
      <svg-icon name="bell" />
    </v-btn>
    <v-btn icon @click="logout">
      <svg-icon name="power" />
    </v-btn>
    <v-menu
      transition="slide-y-transition"
      close-on-content-click
      offset-y
      bottom
    >
      <template v-slot:activator="{ on }">
        <v-btn icon large color="primary" dark v-on="on">
          <v-avatar size="32px" item>
            <v-img :src="$store.getters[`user/avatar`]" alt="Vuetify" />
          </v-avatar>
        </v-btn>
      </template>
    </v-menu>
  </v-app-bar>
</template>

<script>
import SvgIcon from "../../svgIcon/SvgIcon";
import ScreenFull from "../screenFull/ScreenFull";

export default {
  name: "AppBar",
  data: () => ({}),
  methods: {
    navIconClick() {
      this.$store.commit("REVERSE_DRAWER");
    },
    logout() {
      this.$store.dispatch("user/FONT_LOGOUT").then(() => {
        // 刷新路由
        location.pathname =
          process.env.NODE_ENV === "production" ? "/dcms-fontend/" : "/";
      });
    }
  },
  components: {
    SvgIcon,
    ScreenFull
  }
};
</script>

<style scoped></style>
