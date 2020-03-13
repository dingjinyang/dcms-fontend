const Mock = require("mockjs");
export default {
  /** 角色列表 */
  userAll: Mock.mock(/\/role\/all\?pageNum=[1-9]\d*&pageSize=[1-9]\d*/, "get", {
    code: 200,
    msg: "success",
    data: {
      total: 5,
      list: [
        { id: 1, name: "系统管理员" },
        { id: 2, name: "竞赛负责人" },
        { id: 3, name: "学院领导" },
        { id: 4, name: "实践管理科" },
        { id: 5, name: "学生" }
      ],
      pageNum: 1,
      pageSize: 5,
      pages: 1
    }
  })
};
