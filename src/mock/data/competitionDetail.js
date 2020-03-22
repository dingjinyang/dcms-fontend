const Mock = require("mockjs");

export default {
  name: "软件设计大赛",
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
};
