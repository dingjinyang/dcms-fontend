import "../../plugins/axios";

// eslint-disable-next-line no-unused-vars,no-undef
const _axios = axios;

export const getLaunchList = (pageNum = 1, pageSize = 10) => {
  return _axios.get(`/launch/all`, { params: { pageNum, pageSize } });
};
export const getStageParticipants = (
  competitionId,
  stage,
  pageNum = 1,
  pageSize = 10
) => {
  return _axios.get(`/competition/stage/participants`, {
    params: { competitionId, stage, pageNum, pageSize }
  });
};
