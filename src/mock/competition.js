// eslint-disable-next-line no-unused-vars
import store from "../store";

const Mock = require("mockjs");

export default {
  /** 权限列表 */
  competitionAll: Mock.mock(
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
          },
          {
            id: 5,
            year: "2020",
            status: 4,
            name: "计算机技能大赛",
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
  ),
  competitionDetail: Mock.mock(/\/competition\/detail\?id=[1-9]\d*/, "get", {
    code: 200,
    msg: "success",
    data: {
      name: "软件设计大赛",
      level: "院级",
      phone: "110",
      teams: 100,
      people: 200,
      startTime: "2020-01-01",
      endTime: "2020-6-31",
      principal: store.getters["user/info"].username,
      awards: "一等奖",
      description: "@cparagraph",
      achievement: "优秀竞赛",
      flow: "@cparagraph",
      condition: "16级全体学生",
      stages: [
        {
          name: "报名",
          level: 1,
          startTime: "2020-01-01",
          endTime: "2020-02-01",
          sponsor: "软件学院"
        },
        {
          name: "中期检查",
          level: 2,
          startTime: "2020-02-01",
          endTime: "2020-03-01",
          sponsor: "软件学院"
        },
        {
          name: "初赛",
          level: 3,
          startTime: "2020-03-01",
          endTime: "2020-04-01",
          sponsor: "软件学院"
        },
        {
          name: "复赛",
          level: 4,
          startTime: "2020-04-01",
          endTime: "2020-05-01",
          sponsor: "软件学院"
        },
        {
          name: "决赛",
          level: 5,
          startTime: "2020-05-01",
          endTime: "2020-06-01",
          sponsor: "软件学院"
        }
      ]
    }
  }),
  competitionSave: Mock.mock(/\/competition\/save/, "post", {
    code: 200,
    msg: "success",
    data: null
  }),
  competitionCommit: Mock.mock(/\/competition\/commit/, "post", {
    code: 200,
    msg: "success",
    data: null
  })
};
