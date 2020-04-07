export const itemTo = (name, competitionId) => {
  return {
    name,
    params: { competitionId }
  };
};
