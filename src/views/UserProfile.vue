<template>
  <v-app id="inspire">
    <h1>个人信息</h1>
    <v-container grid-list-xl>
      <v-layout wrap justify-space-between>
        <v-row>
          <v-col cols="6" sm="6" md="4">
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
              <v-btn color="warning">修改</v-btn>
              <v-btn color="success" class="ml-4">保存</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      /** 用户信息表单 */
      userForm: {
        userRole: "",
        department: "软件学院",
        jobNumber: "123456"
      },
      loginRoles: [
        {
          color: "error",
          username: "竞赛负责人",
          account: "competitionPrincipal"
        },
        { color: "warning", username: "学院领导", account: "collegeLeader" },
        {
          color: "success",
          username: "实践管理科",
          account: "practiceManagementDivision"
        },
        { color: "primary", username: "学生", account: "student" }
      ],
      /** 部门选项 */
      departmentItems: ["软件学院", "计算机学院"]
    };
  },
  activated() {
    const role = this.$store.getters["user/info"].roles[0];
    this.loginRoles.forEach(item => {
      if (item.account === role) this.userForm.userRole = item.username;
    });
  }
};
</script>

<style scoped></style>
