import Vue from "vue";
const _axios = Vue.axios;

/**
 * 各阶段竞赛数量
 * @returns {*}
 */
export const statusData = () => {
  return _axios.get(`/stageNumber`);
};

/**
 * 参赛小组及人数信息
 * @returns {*}
 */
export const teamsData = () => {
  return _axios.get(`/teamAndNumber`);
};

/**
 * 各学院立项申请
 * @returns {*}
 */
export const collegeCompetition = () => {
  return _axios.get(`/everyCollegeNumber`);
};

/**
 * 各学院经费
 * @returns {*}
 */
export const collegeFund = () => {
  return _axios.get(`/everyCollegeMoney`);
};
