import Vue from "vue";
import { competitionStatus } from "../common/constant";

Vue.filter("competitionStatusTextFilter", value => {
  return competitionStatus[value] && competitionStatus[value].text;
});
Vue.filter("competitionStatusColorFilter", value => {
  return competitionStatus[value] && competitionStatus[value].color;
});
Vue.filter("dateRangeTextFilter", value => {
  return value.join(" ~ ");
});
Vue.filter("competitionStageFilter", value => {
  const cur = new Date().toISOString().substr(0, 10);
  const arr = value.filter(e => {
    return e.startTime < cur && e.endTime > cur;
  });
  return arr && arr[0] && arr[0].name;
});
/**
 * 竞赛团队成员
 */
Vue.filter("teamMemberTextFilter", value => {
  return value.map(e => e.stuName).join(",");
});
