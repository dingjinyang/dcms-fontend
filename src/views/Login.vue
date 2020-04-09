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
      },
      { color: "primary", username: "学生", account: "student" }
    ],
    rules: {
      required: value => !!value || "Required."
    }
  }),
  methods: {
    loginWith(user) {
      this.loginForm = {
        account: user,
        password: user
      };
      this.userLogin();
    },
    userLogin() {
      const _this = this;
      if (!_this.$refs.login_form.validate()) return;
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
