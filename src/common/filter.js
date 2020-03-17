import Vue from "vue";
import { competitionStatus } from "../common/constant";

Vue.filter("competitionStatusTextFilter", value => {
  return competitionStatus[value].text;
});
Vue.filter("competitionStatusColorFilter", value => {
  return competitionStatus[value].color;
});
