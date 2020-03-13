<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :loading="loading"
      :options.sync="options"
      :server-items-length="total"
    >
      <template #top>
        <v-toolbar flat color="white">
          <v-toolbar-title>权限列表</v-toolbar-title>
          <v-divider class="mx-4" inset vertical />
          <v-text-field
            clearable
            placeholder="搜索权限名称或代码"
            :loading="searchLoading"
            v-model="searchText"
            class="mt-5"
            append-outer-icon="mdi-table-search"
            @click:append-outer="searchPermission"
          >
          </v-text-field>
          <v-spacer />
          <v-dialog v-model="dialog" max-width="500px">
            <template #activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">
                新增权限
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="permission_form">
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.name"
                        label="权限名称"
                        required
                        :rules="[v => !!v || '权限名称不能为空']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.perCode"
                        label="权限代码"
                        required
                        :rules="[v => !!v || '权限代码不能为空']"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="close">取消</v-btn>
                <v-btn color="primary" text @click="save">保存</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template #item.action="{ item }">
        <v-btn
          small
          color="success"
          text
          @click="editItem(item)"
          v-perm="`permission:update`"
        >
          编辑
        </v-btn>
        <v-btn
          small
          color="error"
          text
          @click="deleteItem(item)"
          v-perm="`permission:delete`"
        >
          删除
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import {
  getAllPermission,
  insertPermission,
  updatePermission
} from "../../api/system";

export default {
  name: "PermissionManagement",
  data: () => ({
    search: "",
    loading: false,
    searchLoading: false,
    searchText: "",
    dialog: false,
    headers: [
      {
        text: "序号",
        align: "left",
        value: "id"
      },
      { text: "权限名称", sortable: false, value: "name" },
      { text: "权限代码", value: "perCode" },
      { text: "操作", value: "action", sortable: false }
    ],
    desserts: [],
    options: {
      page: 1,
      itemsPerPage: 5
    },
    total: 0,
    editedIndex: -1,
    editedItem: {
      name: "",
      perCode: ""
    },
    defaultItem: {
      name: "",
      perCode: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "新增" : "编辑";
    }
  },
  methods: {
    getDate() {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      getAllPermission(page, itemsPerPage)
        .then(({ code, data: { list, total } }) => {
          if (!code || code !== 200) return;
          this.desserts = list;
          this.total = total;
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        // this.editedItem = Object.assign({}, this.defaultItem);
        this.$refs.permission_form.reset();
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        const id = this.desserts[this.editedIndex].id;
        this.$refs.permission_form.validate() &&
          updatePermission(id, this.editedItem)
            .then(({ code }) => {
              if (code === 200) this.close();
              // TODO 后端添加后再次调用请求
              Object.assign(this.desserts[this.editedIndex], this.editedItem);
            })
            .catch(() => {});
      } else {
        this.$refs.permission_form.validate() &&
          insertPermission(this.editedItem)
            .then(({ code }) => {
              if (code === 200) this.close();
              // TODO 后端添加后再次调用请求
              this.desserts.push(this.editedItem);
            })
            .catch(() => {});
      }
    },
    searchPermission() {
      if (this.searchText.trim()) {
        this.searchLoading = true;
        //TODO 后端查询
        setTimeout(() => {
          this.searchLoading = false;
          this.getDate();
        }, 1000);
      }
    }
  },
  watch: {
    options: {
      handler() {
        this.getDate();
      },
      deep: true
    },
    dialog(val) {
      val || this.close();
    }
  },
  activated() {
    this.getDate();
  }
};
</script>

<style scoped></style>
