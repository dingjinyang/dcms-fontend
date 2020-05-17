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
      <competition-name-link :id="item.competitionId" :name="item.comName" />
    </template>
    <template #item.action="{ item }">
      <v-btn
        text
        small
        color="primary"
        :to="itemTo('FundReimburseDetail', item.competitionId, item.stageId)"
        >查看详情
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import CompetitionNameLink from "@/views/components/CNameLink";
import { fundReimburseHistory } from "@/api/competition/process";

export default {
  name: "FundReimburseList",
  components: { CompetitionNameLink },
  data: () => ({
    loading: false,
    headers: [
      { text: "#", value: "no" },
      { text: "名称", value: "comName" },
      { text: "阶段", value: "stageName" },
      { text: "报销金额", value: "totalMoney" },
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
    itemTo(name, competitionId, stageId) {
      return {
        name,
        params: { competitionId, stageId }
      };
    },
    searchData() {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      fundReimburseHistory(page, itemsPerPage)
        .then(({ code, data: { total, list } }) => {
          if (code !== 200) return;
          this.total = total;
          this.desserts = list;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped></style>
