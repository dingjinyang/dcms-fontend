<template>
  <div>
    <v-row justify="space-around">
      <v-col
        cols="12"
        lg="3"
        md="3"
        sm="6"
        v-for="e in bannerData"
        :key="e.subtitle"
      >
        <v-card max-width="273" height="100">
          <v-list-item>
            <v-list-item-avatar size="53" :color="e.color">
              <v-icon size="37" dark>{{ e.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="display-1"
                >{{ e.title }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ e.subtitle }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-subheader>竞赛参赛小组及人数</v-subheader>
        <ve-histogram
          :data="histogramData"
          :loading="histogramLoading"
        ></ve-histogram>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-subheader>各学院竞赛立项</v-subheader>
        <ve-pie :data="pieData"></ve-pie>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-subheader>各学院经费申请</v-subheader>
        <ve-funnel :data="funnelData"></ve-funnel>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import "v-charts/lib/style.css";
import VeHistogram from "v-charts/lib/histogram.common.min";
import VePie from "v-charts/lib/pie.common.min";
import VeFunnel from "v-charts/lib/funnel.common.min";
import {
  bannerData,
  histogramData,
  pieData,
  funnelData
} from "@/mock/data/analysis";
import {
  statusData,
  teamsData,
  collegeCompetition,
  collegeFund
} from "@/api/dashboard";

export default {
  name: "Dashboard",
  components: { VeHistogram, VePie, VeFunnel },
  data: () => ({
    histogramData,
    histogramLoading: false,
    pieData,
    pieLoading: false,
    funnelData,
    funnelLoading: false,
    bannerData
  }),
  methods: {
    getStatusData() {
      statusData().then(({ code, data }) => {
        if (code !== 200) return;
        this.bannerData.forEach(e => {
          e.title = data[e.subtitle];
        });
      });
    },
    getTeamsData() {
      this.histogramLoading = true;
      teamsData()
        .then(({ code, data }) => {
          if (code !== 200) return;
          this.histogramData.rows = [];
          data.forEach(e => {
            if (e)
              this.histogramData.rows.push({
                竞赛名称: e.competitionName,
                小组: e.teamNumber,
                人数: e.peopleNumber
              });
          });
        })
        .finally(() => {
          this.histogramLoading = false;
        });
    },
    getCollegeCom() {
      this.pieLoading = true;
      collegeCompetition()
        .then(({ code, data }) => {
          if (code !== 200) return;
          this.pieData.rows = [];
          data.forEach(e => {
            if (e)
              this.pieData.rows.push({
                学院: e.competitionName,
                立项: e.number
              });
          });
        })
        .finally(() => {
          this.pieLoading = false;
        });
    },
    getCollegeFund() {
      this.funnelLoading = true;
      collegeFund()
        .then(({ code, data }) => {
          if (code !== 200) return;
          this.funnelData.rows = [];
          data.forEach(e => {
            if (e)
              this.funnelData.rows.push({
                学院: e.competitionName,
                经费: e.money
              });
          });
        })
        .finally(() => {
          this.funnelLoading = false;
        });
    }
  },
  mounted() {
    this.getStatusData();
    this.getTeamsData();
    this.getCollegeCom();
    this.getCollegeFund();
  }
};
</script>

<style scoped></style>
