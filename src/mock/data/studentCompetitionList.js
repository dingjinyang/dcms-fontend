import { Mock } from "../mock";

export default [
  {
    id: 1,
    competition: {
      id: 1,
      year: "2020",
      status: 0,
      name: "ACM程序设计大赛",
      department: "软件学院",
      scope: "软件学院全体学生",
      time: "01/01 - 06/01",
      lastHandler: Mock.mock("@cname"),
      level: "院级",
      phone: "110",
      teams: 100,
      people: 200,
      startTime: "2020-01-01",
      endTime: "2020-6-31",
      principal: Mock.mock("@cname"),
      awards: "一等奖",
      description: Mock.mock("@cparagraph"),
      achievement: "优秀竞赛",
      flow: Mock.mock("@cparagraph"),
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
    },
    teamMember: [
      {
        sno: "201619150118",
        name: "张三",
        class: "RB软工卓越161",
        grade: "2016",
        college: "软件学院"
      }
    ],
    guideTeacher: Mock.mock("@cname"),
    awards: null,
    credential: "https://cdn.vuetifyjs.com/images/parallax/material.jpg"
  },
  {
    id: 2,
    competition: {
      id: 2,
      year: "2020",
      status: 1,
      name: "软件设计大赛",
      department: "软件学院",
      scope: "软件学院全体学生",
      time: "01/01 - 06/01",
      lastHandler: Mock.mock("@cname"),
      level: "院级",
      phone: "110",
      teams: 100,
      people: 200,
      startTime: "2020-01-01",
      endTime: "2020-6-31",
      principal: Mock.mock("@cname"),
      awards: "一等奖",
      description: Mock.mock("@cparagraph"),
      achievement: "优秀竞赛",
      flow: Mock.mock("@cparagraph"),
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
    },
    name: "学科竞赛管理系统",
    teamMember: [
      {
        sno: "201619150118",
        name: "张三",
        class: "RB软工卓越161",
        grade: "2016",
        college: "软件学院"
      },
      {
        sno: "201619150119",
        name: "李四",
        class: "RB软工卓越161",
        grade: "2016",
        college: "软件学院"
      }
    ],
    guideTeacher: Mock.mock("@cname"),
    awards: "一等奖",
    credential: ""
  }
];
