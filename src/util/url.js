/**
 * 通过Url获取请求参数及值
 * @param url
 * @returns {{}}
 */
// eslint-disable-next-line no-unused-vars
export const getURLSearchParams = url => {
  const urlSearchParams = new URLSearchParams(
    url.substring(url.lastIndexOf("?") + 1)
  );
  const params = {};
  for (const [key, value] of urlSearchParams) {
    isNaN(Number(value))
      ? (params[key] = value)
      : (params[key] = parseInt(value));
  }
  return params;
};
