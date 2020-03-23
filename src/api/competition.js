import "../plugins/axios";

// eslint-disable-next-line no-unused-vars,no-undef
const _axios = axios;

export function getAllCompetition(pageNum = 1, pageSize = 10) {
  return _axios.get(`/competition/all`, { params: { pageNum, pageSize } });
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
export function getCompetitionApprovalList(pageNum = 1, pageSize = 10) {
  return _axios.get(`/competition/approval/list`, {
    params: { pageNum, pageSize }
  });
}
export function batchApprovalCompetition(data) {
  return _axios.post(`/competition/approval/batch`, data);
}
