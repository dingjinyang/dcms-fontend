<template>
  <v-card>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :loading="loading"
      :options.sync="options"
      :server-items-length="total"
      show-select
      item-key="id"
    >
      <template #top>
        <v-toolbar dense flat color="white">
          <v-row>
            <v-col
              cols="6"
              xl="1"
              lg="2"
              md="2"
              sm="3"
              v-show="selectedApproval.length"
            >
              <confirm-dialog
                btn-color="success"
                title="确认批量审批"
                max-width="373px"
                @confirm="batchApproval"
              >
                批量审批
                <template #container>
                  <v-list disabled>
                    <v-list-item
                      v-for="item in selectedApproval"
                      :key="item.id"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{ item.name }} </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </template>
              </confirm-dialog>
            </v-col>
            <v-col cols="6" xl="1" lg="2" md="2" sm="3">
              <v-btn color="primary" dark>
                生成汇总表
              </v-btn>
            </v-col>
          </v-row>
        </v-toolbar>
      </template>
      <template #item.name="{ item }">
        <router-link
          :to="{
            name: 'CompetitionDetail',
            params: { competitionId: item.id }
          }"
          class="competition-name-link"
        >
          {{ item.name }}
        </router-link>
      </template>
      <template #item.status="{ item }">
        <v-chip :color="item.status | competitionStatusColorFilter" small dark>
          {{ item.status | competitionStatusTextFilter }}
        </v-chip>
      </template>
      <template #item.action="{ item }">
        <v-btn
          v-if="item.status === 1"
          small
          color="warning"
          text
          :to="itemTo(`CollegeApproval`, item.id)"
          >审批
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import {
  getCollegeApprovalList,
  batchCollegeApproval
} from "../../api/competition/competition";
import ConfirmDialog from "../../components/ConfirmDialog";

export default {
  name: "CollegeApprovalList",
  data: () => ({
    loading: false,
    dialog: false,
    selected: [],
    headers: [
      { text: "#", value: "id" },
      { text: "名称", value: "name", sortable: false },
      { text: "级别", value: "level", sortable: false },
      { text: "主办单位", value: "department", sortable: false },
      { text: "时间", sortable: false },
      { text: "负责人", value: "principal", sortable: false },
      { text: "联系方式", value: "phone", sortable: false },
      { text: "状态", value: "status", sortable: false },
      { text: "操作", value: "action", sortable: false }
    ],
    desserts: [],
    options: {
      page: 1,
      itemsPerPage: 5
    },
    total: 0
  }),
  components: { ConfirmDialog },
  methods: {
    // TODO 后端请求 本院系本年度立项申请
    getDate() {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      getCollegeApprovalList(page, itemsPerPage)
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
    batchApproval() {
      batchCollegeApproval(this.selectedApproval.map(item => item.id)).then(
        res => {
          if (res.code === 200) this.dialog = false;
        }
      );
    },
    itemTo(name, competitionId) {
      return {
        name,
        params: { competitionId }
      };
    }
  },
  computed: {
    selectedApproval() {
      return this.selected.filter(item => {
        return item.status === 1;
      });
    }
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler() {
        this.getDate();
      }
    }
  }
};
</script>

<style scoped>
.competition-name-link {
  color: #08c;
  text-decoration: none;
}
.competition-name-link:hover {
  color: #0408b7;
  text-decoration: underline;
}
</style>
