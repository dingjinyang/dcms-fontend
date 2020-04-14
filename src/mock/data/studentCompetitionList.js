import { Mock } from "../mock";

export default [
  {
    id: 1,
    competition: {
      id: 1,
      comName: "软件设计大赛",
      department: "软件学院",
      comLevel: "院级",
      principalId: 5771,
      principalPhone: 12345678910,
      students: 50,
      participants: 100,
      awards: "一等奖一名\n二等奖两名\n三等奖三名",
      description: "软件改变生活，软件创造价值",
      flow: "报名-初赛-复赛-决赛",
      comCondition: "中原工学院全体学生",
      comStatus: 1,
      comDate: "2020-04-02",
      sponsor: "软件学院大学生社团联合会",
      budget: 0,
      lastHandler: 1,
      collegeModifySuggest: null,
      practiceModifySuggest: null,
      currentStage: 1,
      competitionStages: [
        {
          stage: 1,
          stageName: "报名",
          startTime: "2020-04-01",
          endTime: "2020-04-30"
        },
        {
          stage: 2,
          stageName: "初赛",
          startTime: "2020-05-01",
          endTime: "2020-05-01"
        },
        {
          stage: 3,
          stageName: "复赛",
          startTime: "2020-05-23",
          endTime: "2020-05-24"
        },
        {
          stage: 4,
          stageName: "决赛",
          startTime: "2020-06-01",
          endTime: "2020-06-01"
        }
      ]
    },
    students: [
      {
        id: "201619150118",
        stuName: "张三",
        stuClass: "RB软工卓越161",
        grade: "2016",
        department: "软件学院"
      }
    ],
    opusName: "学科竞赛管理系统",
    adviserName: Mock.mock("@cname"),
    awards: null,
    currentStageName: "初赛",
    credential: "https://cdn.vuetifyjs.com/images/parallax/material.jpg"
  },
  {
    id: 2,
    competition: {
      id: 2,
      comName: "ACM程序设计大赛",
      department: "软件学院",
      comLevel: "校级",
      principalId: 5771,
      principalPhone: 12345678910,
      students: 100,
      participants: 300,
      awards: "一等奖一名\n二等奖二名\n三等奖三名\n优秀奖若干",
      description: "ACM程序设计大赛",
      flow: "报名-初赛-决赛",
      comCondition: "中原工学院全体学生",
      comStatus: 2,
      comDate: "2020-04-02",
      sponsor: "中原工学院计算机技术学院",
      budget: 0,
      lastHandler: 1,
      collegeModifySuggest: null,
      practiceModifySuggest: null,
      currentStage: 1,
      competitionStages: [
        {
          stage: 1,
          stageName: "报名",
          startTime: "2020-04-06",
          endTime: "2020-04-12"
        },
        {
          stage: 2,
          stageName: "初赛",
          startTime: "2020-05-01",
          endTime: "2020-05-01"
        },
        {
          stage: 3,
          stageName: "决赛",
          startTime: "2020-05-22",
          endTime: "2020-05-22"
        }
      ]
    },
    name: "学科竞赛管理系统",
    students: [
      {
        id: "201619150118",
        stuName: "张三",
        stuClass: "RB软工卓越161",
        grade: "2016",
        department: "软件学院"
      },
      {
        id: "201619150119",
        stuName: "李四",
        stuClass: "RB软工卓越161",
        grade: "2016",
        department: "软件学院"
      }
    ],
    opusName: "图书管理系统",
    adviserName: Mock.mock("@cname"),
    awards: "一等奖",
    credential: null,
    currentStageName: "初赛"
  }
];
