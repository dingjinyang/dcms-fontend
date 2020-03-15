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
            year: "2020",
            status: 0,
            name: "ACM程序设计大赛",
            department: "软件学院",
            principal: "@CNAME",
            scope: "软件学院全体学生",
            time: "01/01 - 06/01",
            lastHandler: "@CNAME",
            description: "@cparagraph"
          },
          {
            id: 2,
            year: "2020",
            status: 1,
            name: "软件设计大赛",
            department: "软件学院",
            principal: "@CNAME",
            scope: "软件学院全体学生",
            time: "01/01 - 06/01",
            lastHandler: "@CNAME",
            description: "@cparagraph"
          },
          {
            id: 3,
            year: "2020",
            status: 2,
            name: "软件知识大赛",
            department: "软件学院",
            principal: "@CNAME",
            scope: "软件学院全体学生",
            time: "01/01 - 06/01",
            lastHandler: "@CNAME",
            description: "@cparagraph"
          },
          {
            id: 4,
            year: "2020",
            status: 3,
            name: "软件创意大赛",
            department: "软件学院",
            principal: "@CNAME",
            scope: "软件学院全体学生",
            time: "01/01 - 06/01",
            lastHandler: "@CNAME",
            description: "@cparagraph"
          }
        ],
        pageNum: 1,
        pageSize: 10,
        pages: 1
      }
    }
  )
};
