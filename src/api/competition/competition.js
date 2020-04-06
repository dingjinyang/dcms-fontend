import "../../plugins/axios";

// eslint-disable-next-line no-unused-vars,no-undef
const _axios = axios;

export async function getAllCompetition(pageNum = 1, pageSize = 10, search) {
  return await _axios.get(`/selectCompetition`, {
    params: { pageNum, pageSize, ...search }
  });
}
export function getCompetitionDetail(id) {
  return _axios.get(`/selectCompetitionById`, { params: { id } });
}
export function saveApply(data) {
  return _axios.post(`/saveCompetition`, data);
}
export function commitApply(data) {
  return _axios.post(`/submitCompetition`, data);
}
export function deleteApply(competitionId) {
  return _axios.delete(`/teaDeleteCompetition`, {
    params: { competitionId }
  });
}
export const approvalApply = id => {
  return _axios.post(`/competition/approval`, { id });
};
export const returnApply = (id, suggest) => {
  return _axios.post(`/competition/return`, { id, suggest });
};
export const rejectApply = id => {
  return _axios.post(`/competition/reject`, { id });
};

export function getCollegeApprovalList(pageNum = 1, pageSize = 10, search) {
  return _axios.get(`/college/approval/list`, {
    params: { pageNum, pageSize, ...search }
  });
}
export function batchCollegeApproval(data) {
  return _axios.post(`/college/approval/batch`, data);
}
export const getPracticeApprovalList = (pageNum = 1, pageSize = 10, search) => {
  return _axios.get(`/practice/list`, {
    params: { pageNum, pageSize, ...search }
  });
};
export function batchPracticeApproval(data) {
  return _axios.post(`/practice/approval/batch`, data);
}
