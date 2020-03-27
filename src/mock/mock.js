export const Mock = require("mockjs");
export const responseData = (data = null) => ({
  code: 200,
  msg: "success",
  data
});
