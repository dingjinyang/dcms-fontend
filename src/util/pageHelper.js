export const pageHelper = (data, pageNum, pageSize) => {
  const total = (data && data.length) || 0;
  const pages = Math.ceil(total / 5);
  pageNum = parseInt(pageNum);
  pageSize = parseInt(pageSize);
  let list =
    pageSize > 0
      ? data.slice((pageNum - 1) * pageSize, pageNum * pageSize)
      : data;
  return {
    total,
    list,
    pageNum,
    pageSize,
    pages
  };
};
