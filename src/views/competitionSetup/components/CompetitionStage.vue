<template>
  <v-container>
    <span class="text--secondary" style="font-size: .8rem">竞赛阶段</span>
    <v-slider
      v-model="tabs"
      append-icon="mdi-tab-plus"
      prepend-icon="mdi-tab-minus"
      @click:append="tabsPlus"
      @click:prepend="tabsMinus"
      thumb-label="always"
      :thumb-size="thumbSize"
      min="1"
      max="10"
      readonly
    ></v-slider>
    <v-card class="px-3" tile>
      <v-tabs v-model="tab" show-arrows>
        <v-tabs-slider></v-tabs-slider>
        <v-tab v-for="i in tabs" :key="i" :href="`#stage-${i}`">
          阶段 {{ i }}
        </v-tab>
        <v-tab-item v-for="i in tabs" :key="i" :value="`stage-${i}`">
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="6" xl="3">
              <v-text-field
                v-model="stageForms[i - 1].name"
                persistent-hint
                label="阶段名称"
                type="number"/></v-col
            ><v-col cols="12" sm="12" md="6" lg="6" xl="3">
              <v-text-field
                v-model="stageForms[i - 1].level"
                persistent-hint
                label="级别"
                type="number"/></v-col
            ><v-col cols="12" sm="12" md="6" lg="6" xl="3">
              <v-text-field
                v-model="stageForms[i - 1].time"
                persistent-hint
                label="时间"/></v-col
            ><v-col cols="12" sm="12" md="6" lg="6" xl="3">
              <v-text-field
                v-model="stageForms[i - 1].sponsor"
                persistent-hint
                label="主办方"
            /></v-col>
          </v-row>
        </v-tab-item> </v-tabs
    ></v-card>
  </v-container>
</template>

<script>
export default {
  name: "CompetitionStage",
  data: () => ({
    tab: null,
    tabs: 1,
    stage: {
      name: "",
      level: "",
      date: "",
      sponsor: ""
    },
    stageForms: [
      {
        name: "",
        level: "",
        date: "",
        sponsor: ""
      }
    ]
  }),
  computed: {
    thumbSize() {
      return 20 + this.tabs * 2;
    }
  },
  methods: {
    tabsPlus() {
      this.tabs++;
      this.stageForms.push({ ...this.stage });
    },
    tabsMinus() {
      this.tabs--;
      this.stageForms.pop();
    }
  }
};
</script>

<style scoped></style>
