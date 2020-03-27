import "../plugins/axios";

// eslint-disable-next-line no-unused-vars,no-undef
const _axios = axios;

const Timeout = times => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, times);
  });
};
export const getStudentInfoBySno = async sno => {
  await Timeout(2000);
  return await _axios.get(`/student/info`, {
    params: { sno }
  });
};
export const getStudentCompetitionList = sno => {
  return _axios.get(`/student/competition/all`, {
    params: { sno }
  });
};
