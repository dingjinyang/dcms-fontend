import Vue from "vue";
const _axios = Vue.axios;

export const selectCompetitionList = (pageNum = 1, pageSize = 5, search) => {
  return _axios.get(`/selectCompetition`, {
    params: { pageNum, pageSize, ...search }
  });
};
/**
 * 根据 Id 查询竞赛
 * @param competitionId
 * @returns {*}
 */
export const selectCompetition = competitionId => {
  return _axios.get(`/selectCompetitionById`, { params: { competitionId } });
};
/**
 * 保存申請
 * @param data
 * @returns {*}
 */
export const saveApply = data => {
  return _axios.post(`/saveCompetition`, data);
};
/**
 * 提交申請
 * @param data
 * @returns {*}
 */
export const commitApply = data => {
  return _axios.post(`/submitCompetition`, data);
};
/**
 * 撤消申請
 * @param competitionId
 * @returns {*}
 */
export const deleteApply = competitionId => {
  return _axios.delete(`/teaDeleteCompetition`, {
    params: { competitionId }
  });
};

/**
 * 通过审核
 * @param data
 * @returns {*}
 */
export const approvalApply = data => {
  return _axios.post(`/past`, data);
};
/**
 * 返回修改
 * @param data
 * @returns {*}
 */
export const returnApply = data => {
  return _axios.post(`/comAlter`, data);
};
/**
 * 驳回
 * @param data
 * @returns {*}
 */
export const rejectApply = data => {
  return _axios.post(`/comBack`, data);
};

/**
 * 学院审批列表
 * @param pageNum
 * @param pageSize
 * @param search
 * @returns {*}
 */
export const selectCollegeApprovalList = (
  pageNum = 1,
  pageSize = 5,
  search
) => {
  return _axios.get(`/teacherList`, {
    params: { pageNum, pageSize, ...search }
  });
};
/**
 * 实践管理科审批列表
 * @param pageNum
 * @param pageSize
 * @param search
 * @returns {*}
 */
export const selectPracticeApprovalList = (
  pageNum = 1,
  pageSize = 5,
  search
) => {
  return _axios.get(`/glkList`, {
    params: { pageNum, pageSize, ...search }
  });
};
