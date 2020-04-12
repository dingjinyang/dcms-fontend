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
 * 竞赛进入下一竞赛阶段
 * @param competitionId
 * @returns {*}
 */
export const competitionNextStage = competitionId => {
  return _axios.get(`/teaControlNextStage`, { params: { competitionId } });
};
/**
 * 竞赛团队进入下一个阶段
 * @param ids
 * @returns {*}
 */
export const teamNextStage = ids => {
  return _axios.put(`/teaControlTeamNextStage`, ids);
};
/**
 * 取消当前阶段比赛资格
 * @param id
 * @returns {*}
 */
export const teamBackStage = id => {
  return _axios.put(`/teaDeleteTeamStage`, id);
};
/**
 * 竞赛团队获奖
 * @param data
 * @returns {*}
 */
export const teamWinAward = data => {
  return _axios.put(`/getSuccess`, data);
};
