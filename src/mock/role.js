const Mock = require("mockjs");
export default {
  /** 角色列表 */
  userAll: Mock.mock(/\/role\/all\?pageNum=[1-9]\d*&pageSize=[1-9]\d*/, "get", {
    code: 200,
    msg: "success",
    data: {
      total: 3,
      list: [
        { id: 2, name: "admin" },
        { id: 1, name: "root" },
        { id: 3, name: "user" }
      ],
      pageNum: 1,
      pageSize: 3,
      pages: 1
    }
  })
};
