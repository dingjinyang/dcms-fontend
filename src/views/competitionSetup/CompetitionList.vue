<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :loading="loading"
      :options.sync="options"
      :server-items-length="total"
      show-expand
    >
      <template #top>
        <v-row no-gutters>
          <v-col cols="12" xl="11" lg="10" md="12" sm="12">
            <table-search-toolbar @search="tableSearch" />
          </v-col>
          <v-col cols="12" xl="1" lg="2" md="12" sm="12">
            <v-toolbar dense flat color="white">
              <v-spacer />
              <v-btn
                color="primary"
                dark
                @click="$router.push({ name: 'CompetitionLaunch' })"
              >
                发起竞赛
              </v-btn>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.department"
                            label="Code"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="orange darken-1" text @click="close"
                      >取消</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="save">保存</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </v-col>
        </v-row>
      </template>
      <template #item.status="{ item }">
        <v-chip :color="getColor(item.status)" small dark>
          {{ item.status | statusText }}
        </v-chip>
      </template>
      <template #item.action="{ item }">
        <v-btn small color="warning" text @click="checkItem(item)">
          审核
        </v-btn>
        <v-btn small color="success" text @click="editItem(item)">
          编辑
        </v-btn>
        <v-btn small color="error" text @click="deleteItem(item)">
          删除
        </v-btn>
      </template>
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          参赛对象：{{ item.scope }} <br />竞赛描述：{{ item.description }}
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { getAllCompetition } from "../../api/competition";
import TableSearchToolbar from "./components/TableSearchToolbar";

export default {
  name: "CompetitionList",
  data: () => ({
    loading: false,
    dialog: false,
    headers: [
      { text: "#", value: "id" },
      { text: "名称", value: "name" },
      { text: "年份", value: "year" },
      { text: "部门", value: "department" },
      { text: "时间", value: "time" },
      { text: "负责人", value: "principal" },
      { text: "状态", value: "status" },
      { text: "最后处理人", value: "lastHandler" },
      { text: "操作", value: "action" },
      { text: "", value: "data-table-expand" }
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
      department: ""
    },
    defaultItem: {
      name: "",
      department: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "编辑";
    }
  },
  methods: {
    // TODO 本院系本年度立项申请
    getDate() {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      getAllCompetition(page, itemsPerPage)
        .then(({ code, data: { list, total } }) => {
          if (code !== 200) return;
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
    checkItem(item) {
      this.$router.push({
        name: "CompetitionDetail",
        params: { competitionId: item.id }
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
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },

    getColor(status) {
      const colors = ["error", "warning", "success", "text"];
      return colors[status];
    },
    /**
     * 表单检索
     * @param search
     */
    // eslint-disable-next-line no-unused-vars
    tableSearch(search) {
      // TODO 调用后端接口检索
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
  filters: {
    statusText(val) {
      const text = ["待审核", "报名中", "比赛中", "已结束"];
      return text[val];
    }
  },
  activated() {
    this.getDate();
  },
  components: { TableSearchToolbar }
};
</script>

<style scoped></style>
