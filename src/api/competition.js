import "../plugins/axios";

// eslint-disable-next-line no-unused-vars,no-undef
const _axios = axios;

export function getAllCompetition(pageNum = 1, pageSize = 10) {
  return _axios.get(`/competition/all`, { params: { pageNum, pageSize } });
}
