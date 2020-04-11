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
    <template #top>
      <c-table-search @search="searchData" />
    </template>
    <template #item.no="{ item }">
      {{ desserts.indexOf(item) + 1 }}
    </template>
    <template #item.comName="{ item }">
      <competition-name-link :id="item.id" :name="item.comName" />
    </template>
    <template #item.time="{ item }">
      {{ `${item.startTime} - ${item.endTime}` }}
    </template>
    <template #item.currentStage="{ item }">
      {{ item | currentStageFilter }}
    </template>
    <template #item.stageTimeRange="{ item }">
      {{ item | stageTimeRangeFilter }}
    </template>
    <template #item.action="{ item }">
      <v-btn
        small
        color="primary"
        text
        :to="itemTo('ConfirmParticipantList', item.id)"
        >过程管理
      </v-btn>
      <v-btn small color="success" text>奖项录入 </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { selectProcessList } from "@/api/competition/process";
import CTableSearch from "@/views/components/CTableSearch";
import CompetitionNameLink from "@/views/components/CNameLink";
import { competitionSearchForm } from "@/common/constant";
import { itemTo } from "@/util";

export default {
  name: "CompetitionProcessList",
  components: { CTableSearch, CompetitionNameLink },
  filters: {
    currentStageFilter(competition) {
      const stage = competition.competitionStages[competition.currentStage - 1];
      return stage ? stage.stageName : "已结束";
    },
    stageTimeRangeFilter(competition) {
      const stage = competition.competitionStages[competition.currentStage - 1];
      return competition.currentStage > 0
        ? stage && `${stage.startTime} - ${stage.endTime}`
        : "";
    }
  },
  data: () => ({
    loading: false,
    headers: [
      { text: "#", value: "no" },
      { text: "名称", value: "comName" },
      { text: "当前阶段", value: "currentStage" },
      { text: "阶段时间", value: "stageTimeRange" },
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
    itemTo,
    searchData(searchFrom = competitionSearchForm) {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      selectProcessList(page, itemsPerPage, searchFrom)
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
    }
  }
};
</script>
