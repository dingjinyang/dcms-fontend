<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark class="mb-2" v-on="on">添加组员</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">新增组员</span>
      </v-card-title>

      <v-card-text>
        <v-autocomplete
          v-model="model"
          :loading="isLoading"
          :search-input.sync="search"
          :error="error"
          :error-messages="errorMessage"
          hide-no-data
          item-text="Description"
          item-value="API"
          label="学号"
          placeholder="输入学号搜索"
          append-outer-icon="mdi-database-search"
          @click:append-outer="snoSearch"
          return-object
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-expand-transition>
        <v-list v-if="model">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-text="model['id']" />
              <v-list-item-subtitle>学号</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-text="model['stuName']" />
              <v-list-item-subtitle>姓名</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-text="model['stuClass']" />
              <v-list-item-subtitle>班级</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-text="model['grade']" />
              <v-list-item-subtitle>年级</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-text="model['department']" />
              <v-list-item-subtitle>学院</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expand-transition>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="close">
          取消
        </v-btn>
        <v-btn color="primary" text @click="save">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getStudentInfoBySno } from "../../../api/student";

export default {
  name: "EnrollFormAddItem",
  data: () => ({
    dialog: false,
    isLoading: false,
    model: null,
    search: null,
    error: false,
    errorMessage: ""
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    close() {
      this.search = null;
      this.model = null;
      this.dialog = false;
    },
    save() {
      if (!this.model) return;
      this.dialog = false;
      this.$emit("add", this.model);
    },
    async snoSearch() {
      this.isLoading = true;

      await getStudentInfoBySno(this.search)
        .then(({ code, msg, data }) => {
          if (code === 200) {
            this.error = false;
            this.errorMessage = "";
            this.model = data;
          }
          if (code === 400) {
            this.error = true;
            this.errorMessage = msg;
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>

<style scoped></style>
