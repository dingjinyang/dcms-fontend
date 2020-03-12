const Mock = require("mockjs");

export default {
  /** 权限列表 */
  userAll: Mock.mock(
    /\/competition\/all\?pageNum=[1-9]\d*&pageSize=[1-9]\d*/,
    "get",
    {
      code: 200,
      msg: "success",
      data: {
        total: 3,
        list: [
          {
            id: 1,
            status: 0,
            name: "ACM程序设计大赛",
            college: "软件学院",
            principal: "@CNAME",
            description: "@TEXT"
          },
          {
            id: 2,
            status: 1,
            name: "软件设计大赛",
            college: "软件学院",
            principal: "@CNAME",
            description: "@TEXT"
          },
          {
            id: 3,
            status: 2,
            name: "软件知识大赛",
            college: "软件学院",
            principal: "@CNAME",
            description: "@TEXT"
          },
          {
            id: 4,
            status: 3,
            name: "软件创意大赛",
            college: "软件学院",
            principal: "@CNAME",
            description: "@TEXT"
          }
        ],
        pageNum: 1,
        pageSize: 10,
        pages: 1
      }
    }
  )
};
