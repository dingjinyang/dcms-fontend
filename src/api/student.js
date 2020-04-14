import Vue from "vue";
const _axios = Vue.axios;

export const signUpCompetitionList = (pageNum = 1, pageSize = 5, search) => {
  return _axios.get(`/startedCom`, {
    params: { pageNum, pageSize, ...search }
  });
};

export const searchSignUpInfo = (competitionId, studentId) => {
  return _axios.get(`/joinCom`, {
    params: { competitionId, studentId }
  });
};

export const getStudentInfoBySno = studentId => {
  return _axios.get(`/findStudentById`, {
    params: { studentId }
  });
};
/**
 * 获取所有学生名单
 * @returns {*}
 */
export const getAllStudents = () => {
  return _axios.get(`/allStudent`);
};
/**
 * 比赛报名
 * @param data
 * @returns {*}
 */
export const signUpCompetition = data => {
  return _axios.post(`/submitTeam`, data);
};

/**
 * 获取学生个人竞赛名单
 * @param studentId
 * @returns {*}
 */
export const getPersonalCompetitionList = studentId => {
  return _axios.get(`/MyCom`, {
    params: { studentId }
  });
};
/**
 * 图片上传
 * @param teamId
 * @param file
 * @returns {*}
 */
export const upload = (teamId, file) => {
  return _axios.post("/upload", file, {
    params: { teamId },
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
