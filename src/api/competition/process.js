import Vue from "vue";
const _axios = Vue.axios;

/**
 * 可以发起的比赛
 * @param pageNum
 * @param pageSize
 * @returns {*}
 */
export const selectLaunchList = (pageNum = 1, pageSize = 5) => {
  return _axios.get(`/beginList`, { params: { pageNum, pageSize } });
};
/**
 * 发起比赛
 * @param competitionId
 * @returns {*}
 */
export const launchCompetition = competitionId => {
  return _axios.get(`/beginCom`, { params: { competitionId } });
};
export const getStageParticipants = (
  competitionId,
  stage,
  pageNum = 1,
  pageSize = 10
) => {
  return _axios.get(`/competition/stage/participants`, {
    params: { competitionId, stage, pageNum, pageSize }
  });
};
