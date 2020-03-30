import "../plugins/axios";

// eslint-disable-next-line no-unused-vars,no-undef
const _axios = axios;

//TODO 注意学生接口限制，避免查询不必要信息
export const getStudentInfoBySno = async sno => {
  return await _axios.get(`/student/info`, {
    params: { sno }
  });
};
export const getStudentCompetitionList = sno => {
  return _axios.get(`/student/competition/all`, {
    params: { sno }
  });
};
