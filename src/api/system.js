import "../plugins/axios";

// eslint-disable-next-line no-unused-vars,no-undef
const _axios = axios;

export function getAllUser(pageNum = 1, pageSize = 10) {
  return _axios.get(`/user/all`, { params: { pageNum, pageSize } });
}

export function getAllRole(pageNum = 1, pageSize = 10) {
  return _axios.get(`/role/all`, { params: { pageNum, pageSize } });
}

export function getAllPermission(pageNum = 1, pageSize = 10) {
  return _axios.get(`/permission/all`, { params: { pageNum, pageSize } });
}
