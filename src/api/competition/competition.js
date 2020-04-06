import "../../plugins/axios";

// eslint-disable-next-line no-unused-vars,no-undef
const _axios = axios;

export async function getAllCompetition(pageNum = 1, pageSize = 10, search) {
  return await _axios.get(`/selectCompetition`, {
    params: { pageNum, pageSize, ...search }
  });
}
export function getCompetitionDetail(competitionId) {
  return _axios.get(`/selectCompetitionById`, { params: { competitionId } });
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
export const approvalApply = (competitionId, stage = 5) => {
  return _axios.get(`/teaChange`, { params: { competitionId, stage } });
};
export const returnApply = (id, suggest) => {
  return _axios.post(`/competition/return`, { id, suggest });
};
export const rejectApply = (competitionId, stage = 4) => {
  return _axios.get(`/teaChange`, { params: { competitionId, stage } });
};

export function getCollegeApprovalList(pageNum = 1, pageSize = 10, search) {
  return _axios.get(`/college/approval/list`, {
    params: { pageNum, pageSize, ...search }
  });
}
export const getPracticeApprovalList = (pageNum = 1, pageSize = 10, search) => {
  return _axios.get(`/practice/list`, {
    params: { pageNum, pageSize, ...search }
  });
};
