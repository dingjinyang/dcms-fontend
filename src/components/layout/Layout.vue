<template>
  <v-app id="inspire">
    <!-- 顶部导航栏-->
    <app-bar />
    <!-- 侧边导航栏 -->
    <navigation-bar />
    <!--  内容区  -->
    <v-content>
      <breadcrumbs class="ml-2" />
      <v-container fluid>
        <div class="ml-5">
          <v-scroll-x-transition mode="out-in">
            <router-view />
          </v-scroll-x-transition>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "./app/AppBar";
import NavigationBar from "./navigation/NavigationBar";
import Breadcrumbs from "./breadcrumbs/Breadcrumbs";

export default {
  name: "Layout",
  components: { AppBar, NavigationBar, Breadcrumbs }
};
</script>

<style scoped></style>
