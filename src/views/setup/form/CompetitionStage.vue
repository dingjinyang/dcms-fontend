<template>
  <div>
    <span class="text--secondary" style="font-size: .8rem">竞赛阶段</span>
    <v-slider
      v-model="tabs"
      append-icon="mdi-tab-plus"
      prepend-icon="mdi-tab-minus"
      @click:append="tabsPlus"
      @click:prepend="tabsMinus"
      thumb-label="always"
      :thumb-size="thumbSize"
      class="mt-3"
      :min="tabsMin"
      :max="tabsMax"
      readonly
    ></v-slider>
    <v-card class="px-3" tile>
      <v-tabs v-model="tab" show-arrows>
        <v-tabs-slider></v-tabs-slider>
        <v-tab v-for="i in tabs" :key="i" :href="`#stage-${i}`">
          阶段 {{ i }}
        </v-tab>
        <v-tab-item v-for="i in tabs" :key="i" :value="`stage-${i}`">
          <competition-stage-tab-item
            v-bind="$attrs"
            :stage.sync="stageForms[i - 1]"
          />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import { competitionStage } from "@/common/constant";
import CompetitionStageTabItem from "./CompetitionStageTabItem";
export default {
  name: "CompetitionStage",
  components: { CompetitionStageTabItem },
  inheritAttrs: false,
  props: {
    stages: Array
  },
  data() {
    return {
      tab: null,
      tabs: 1,
      tabsMin: 1,
      tabsMax: 10,
      menu: false,
      stage: { ...competitionStage },
      stageForms: []
    };
  },
  watch: {
    stages: {
      immediate: true,
      handler(val) {
        this.stageForms = val;
        this.tabs = val.length;
      }
    }
  },
  methods: {
    tabsPlus() {
      !this.$attrs.readonly &&
        this.stageForms.length < this.tabsMax &&
        this.stageForms.push({
          ...this.stage,
          stage: this.stageForms.length
        });
    },
    tabsMinus() {
      !this.$attrs.readonly &&
        this.stageForms.length > this.tabsMin &&
        this.stageForms.pop();
    }
  },
  computed: {
    thumbSize() {
      return 15 + this.tabs * 2;
    },
    isDetail() {
      return this.$route.name === "CompetitionDetail";
    }
  }
};
</script>

<style scoped></style>
