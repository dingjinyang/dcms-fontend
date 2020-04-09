<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout class="align-center justify-center">
          <v-flex xs12 sm8 md6 lg5 xl3>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>学科竞赛管理系统</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="login_form">
                  <v-text-field
                    label="账户"
                    name="account"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="loginForm.account"
                    :rules="[rules.required]"
                  ></v-text-field>

                  <v-text-field
                    label="密码"
                    name="password"
                    prepend-icon="mdi-lock"
                    :type="passwordDisplay ? 'text' : 'password'"
                    v-model="loginForm.password"
                    :append-icon="passwordDisplay ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="passwordDisplay = !passwordDisplay"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <div v-for="item in loginRoles" :key="item.account">
                  <v-btn
                    :loading="loginLoading"
                    text
                    :color="item.color"
                    @click="loginWith(item.account)"
                    >{{ item.username }}
                  </v-btn>
                </div>
                <v-menu offset-x right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      :loading="loginLoading"
                      text
                      color="success"
                      >学生
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in students"
                      :key="index"
                      @click="studentLogin(item.id)"
                    >
                      <v-list-item-title>{{
                        ` ${item.id} - ${item.stuName}`
                      }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <!--                <v-btn-->
                <!--                  :loading="loginLoading"-->
                <!--                  color="primary"-->
                <!--                  @click="userLogin"-->
                <!--                  >Login-->
                <!--                </v-btn>-->
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { getAllStudents } from "@/api/student";

export default {
  name: "Login",
  data: () => ({
    passwordDisplay: false,
    loginLoading: false,
    loginForm: {
      account: "",
      password: ""
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
      }
    ],
    rules: {
      required: value => !!value || "Required."
    },
    students: [{ id: "2018", stuName: "ding" }]
  }),
  mounted() {
    getAllStudents().then(({ code, data }) => {
      if (code === 200) this.students = data;
    });
  },
  methods: {
    loginWith(user) {
      this.loginForm = {
        account: user,
        password: user
      };
      this.userLogin();
    },
    studentLogin(id) {
      localStorage.setItem("id", id);
      this.loginWith("student");
    },
    userLogin() {
      const _this = this;
      // if (!_this.$refs.login_form.validate()) return;
      // 表单验证成功
      _this.loginLoading = true;
      _this.$store
        .dispatch("user/LOGIN", _this.loginForm)
        .then(res => {
          if (res.code === 200) {
            _this.loginLoading = false;
            _this.$router.replace("/");
            this.$message.$emit("message", { text: "登陆成功" });
          }
        })
        .catch(({ code, msg }) => {
          code === 400 && this.$message.$emit("message", { text: msg });
        })
        .finally(() => {
          _this.loginLoading = false;
        });
    }
  }
};
</script>

<style scoped></style>
