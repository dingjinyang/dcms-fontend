<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :loading="loading"
      :options.sync="options"
      :server-items-length="total"
      item-key="id"
    >
      <template #item.name="{ item }">
        <competition-name-link :id="item.id" :name="item.name" />
      </template>
      <template #item.status="{ item }">
        <v-chip :color="item.status | competitionStatusColorFilter" small dark>
          {{ item.status | competitionStatusTextFilter }}
        </v-chip>
      </template>
      <template #item.action>
        <confirm-dialog
          title="竞赛发起"
          btn-color="success"
          btn-text
          btn-small
          max-width="300px"
          hide-text
        >
          发起
        </confirm-dialog>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import CompetitionNameLink from "../components/CNameLink";
import { getLaunchList } from "../../api/competition/process";
import ConfirmDialog from "../../components/ConfirmDialog";

export default {
  name: "CompetitionLaunch",
  data: () => ({
    loading: false,
    dialog: false,
    headers: [
      { text: "#", value: "id" },
      { text: "名称", value: "name", sortable: false },
      { text: "级别", value: "level", sortable: false },
      { text: "主办单位", value: "department", sortable: false },
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
  components: { CompetitionNameLink, ConfirmDialog },
  methods: {
    // TODO 后端请求 本院系本年度立项申请
    getDate() {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      getLaunchList(page, itemsPerPage)
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
    itemTo(name, competitionId) {
      return {
        name,
        params: { competitionId }
      };
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

<style scoped></style>
