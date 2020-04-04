import "../../plugins/axios";

// eslint-disable-next-line no-unused-vars,no-undef
const _axios = axios;

export async function getAllCompetition(pageNum = 1, pageSize = 10, search) {
  return await _axios.get(`/competition/all`, {
    params: { pageNum, pageSize, ...search }
  });
}
export function getCompetitionDetail(id) {
  return _axios.get(`/competition/detail`, { params: { id } });
}
export function saveCompetitionApply(data) {
  return _axios.post(`/competition/save`, data);
}
export function commitCompetitionApply(data) {
  return _axios.post(`/competition/commit`, data);
}
export function getCollegeApprovalList(pageNum = 1, pageSize = 10, search) {
  return _axios.get(`/college/approval/list`, {
    params: { pageNum, pageSize, ...search }
  });
}
export function batchCollegeApproval(data) {
  return _axios.post(`/college/approval/batch`, data);
}
export function getPracticeApprovalList(pageNum = 1, pageSize = 10, search) {
  return _axios.get(`/practice/approval/list`, {
    params: { pageNum, pageSize, ...search }
  });
}
export function batchPracticeApproval(data) {
  return _axios.post(`/practice/approval/batch`, data);
}
