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
      <c-table-search />
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
    <template #item.stages="{ item }">
      {{ item.competitionStages | competitionStageFilter }}
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
import { selectCompetitionList } from "@/api/competition/competition";
import CTableSearch from "@/views/components/CTableSearch";
import CompetitionNameLink from "@/views/components/CNameLink";

export default {
  name: "CompetitionProcessList",
  components: { CTableSearch, CompetitionNameLink },
  data: () => ({
    loading: false,
    headers: [
      { text: "#", value: "no" },
      { text: "名称", value: "name" },
      { text: "时间", value: "time" },
      { text: "竞赛阶段", value: "stages" },
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
      handler() {
        this.searchData();
      },
      deep: true
    }
  },
  methods: {
    searchData(
      searchFrom = {
        year: new Date().getFullYear(),
        department: null,
        comName: null,
        sponsor: null
      }
    ) {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      selectCompetitionList(page, itemsPerPage, searchFrom)
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
     * 表格操作跳转至竞赛详情页 - 编辑/删除
     * @param name 路由名称
     * @param id number
     */
    itemTo(name, id) {
      return {
        name,
        params: { id }
      };
    },
    /**
     * 表单检索
     * @param searchFrom
     */
    // eslint-disable-next-line no-unused-vars
    tableSearch(searchFrom) {
      console.log(searchFrom);
      // TODO 调用后端接口检索
    }
  }
};
</script>
