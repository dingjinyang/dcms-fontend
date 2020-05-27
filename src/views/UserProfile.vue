<template>
  <div id="user-profile">
    <h1>个人信息</h1>
    <v-container grid-list-xl>
      <v-layout wrap justify-space-between>
        <v-row>
          <v-col cols="12" sm="10" md="8" lg="6" xl="4">
            <v-form ref="form">
              <v-text-field
                v-model="userForm.userRole"
                label="角色"
                readonly
              ></v-text-field>
              <v-text-field
                v-model="userForm.jobNumber"
                label="工号"
                readonly
              ></v-text-field>
              <v-select
                persistent-hint
                single-line
                v-model="userForm.department"
                :items="departmentItems"
                label="部门"
                readonly
              ></v-select>
              <!--              <v-btn class="my-2" color="warning">修改</v-btn>-->
              <!--              <v-btn class="my-2 mx-2" color="success">保存</v-btn>-->
            </v-form>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { colleges } from "@/common/constant";

export default {
  name: "UserProfile",
  data() {
    return {
      /** 用户信息表单 */
      userForm: {
        userRole: "",
        department: "软件学院",
        jobNumber: ""
      },
      loginRoles: [
        {
          color: "error",
          username: "竞赛负责人",
          account: "principal"
        },
        { color: "warning", username: "学院领导", account: "college" },
        {
          color: "success",
          username: "实践管理科",
          account: "practice"
        },
        { color: "primary", username: "学生", account: "student" }
      ],
      /** 部门选项 */
      departmentItems: colleges
    };
  },
  mounted() {
    const role = this.$store.getters["user/info"].roles[0];
    this.userForm.jobNumber = this.$store.getters["user/info"].id;
    this.userForm.department = this.$store.getters["user/info"].department;
    this.loginRoles.forEach(item => {
      if (item.account === role) this.userForm.userRole = item.username;
    });
  }
};
</script>

<style scoped></style>
