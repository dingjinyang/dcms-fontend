<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :loading="loading"
    :options.sync="options"
    :server-items-length="total"
    disable-sort
    no-data-text="无数据"
  >
    <template #item.no="{ item }">
      {{ desserts.indexOf(item) + 1 }}
    </template>
    <template #item.comName="{ item }">
      <competition-name-link :id="item.id" :name="item.comName" />
    </template>
    <template #item.comStatus="{ item }">
      <c-status-chip :status="item.comStatus" />
    </template>
    <template #item.action="{ item }">
      <confirm-dialog
        title="竞赛发起"
        btn-color="success"
        btn-text
        btn-small
        max-width="273px"
        hide-text
        @confirm="launch(item)"
      >
        发起
      </confirm-dialog>
    </template>
  </v-data-table>
</template>

<script>
import CompetitionNameLink from "@/views/components/CNameLink";
import CStatusChip from "@/views/components/CStatusChip";
import ConfirmDialog from "@/components/ConfirmDialog";
import { selectLaunchList, launchCompetition } from "@/api/competition/process";

export default {
  name: "CompetitionLaunch",
  components: { CStatusChip, CompetitionNameLink, ConfirmDialog },
  data: () => ({
    loading: false,
    dialog: false,
    headers: [
      { text: "#", value: "no" },
      { text: "名称", value: "comName" },
      { text: "级别", value: "comLevel" },
      { text: "主办单位", value: "sponsor" },
      { text: "状态", value: "comStatus" },
      { text: "操作", value: "action" }
    ],
    desserts: [],
    options: {
      page: 1,
      itemsPerPage: 5
    },
    total: 0
  }),
  watch: {
    options: {
      deep: true,
      handler() {
        this.searchData();
      }
    }
  },
  methods: {
    searchData() {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      selectLaunchList(page, itemsPerPage)
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
    /**
     * 发起比赛
     * @param item
     */
    launch(item) {
      launchCompetition(item.id).then(({ code, msg }) => {
        code === 200 &&
          this.$message.$emit("message", { text: msg }) &&
          this.searchData();
      });
    }
  }
};
</script>

<style scoped></style>
