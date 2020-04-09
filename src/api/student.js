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

export const getAllStudents = () => {
  return _axios.get(`/allStudent`);
};

export const signUpCompetition = data => {
  return _axios.post(`/submitTeam`, data);
};

export const getPersonalCompetitionList = (
  pageNum = 1,
  pageSize = 5,
  id,
  search
) => {
  return _axios.get(`/MyCom`, {
    params: { pageNum, pageSize, id, ...search }
  });
};
