import "../../plugins/axios";

// eslint-disable-next-line no-unused-vars,no-undef
const _axios = axios;

export function getLaunchList(pageNum = 1, pageSize = 10) {
  return _axios.get(`/launch/all`, { params: { pageNum, pageSize } });
}
export function getParticipateEntryList(sno, pageNum = 1, pageSize = 10) {
  return _axios.get(`/participate/entry`, {
    params: { sno, pageNum, pageSize }
  });
}
