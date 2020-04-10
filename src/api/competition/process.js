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
/**
 * 查看已发起的比赛列表
 * @param pageNum 页数
 * @param pageSize
 * @param search
 * @returns {*}
 */
export const selectProcessList = (pageNum = 1, pageSize = 10, search) => {
  return _axios.get(`/controlList`, {
    params: { pageNum, pageSize, ...search }
  });
};
/**
 * 获取竞赛阶段参赛名单
 * @param competitionId
 * @param stage
 * @param pageNum
 * @param pageSize
 * @returns {*}
 */
export const getStageParticipants = (
  competitionId,
  stage,
  pageNum = 1,
  pageSize = 5
) => {
  return _axios.get(`/teaControlComList`, {
    params: { competitionId, stage, pageNum, pageSize }
  });
};
/**
 * 进入下一竞赛阶段
 * @param competitionId
 * @returns {*}
 */
export const intoNextStage = competitionId => {
  return _axios.get(`/teaControlNextStage`, { params: { competitionId } });
};
