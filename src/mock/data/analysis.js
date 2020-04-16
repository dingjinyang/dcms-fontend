export const bannerData = [
  {
    icon: "mdi-file-document-edit-outline",
    color: "primary",
    title: 0,
    subtitle: "竞赛立项"
  },
  {
    icon: "mdi-file-check-outline",
    color: "warning",
    title: 0,
    subtitle: "待审批"
  },
  {
    icon: "mdi-clock-start",
    color: "success",
    title: 0,
    subtitle: "进行中"
  },
  {
    icon: "mdi-clock-end",
    color: "grey",
    title: 0,
    subtitle: "已结束"
  }
];

export const histogramData = {
  columns: ["竞赛名称", "小组", "人数"],
  rows: [
    // { 竞赛名称: "软件设计大赛", 小组: 23, 人数: 103 },
    // { 竞赛名称: "ACM程序设计大赛", 小组: 43, 人数: 230 },
    // { 竞赛名称: "软件创意大赛", 小组: 12, 人数: 223 },
    // { 竞赛名称: "计算机技能大赛", 小组: 43, 人数: 123 },
    // { 竞赛名称: "消防知识竞赛", 小组: 33, 人数: 92 }
  ]
};
export const pieData = {
  columns: ["学院", "立项"],
  rows: [
    // { 学院: "软件学院", 立项: 1393 },
    // { 学院: "计算机学院", 立项: 3530 },
    // { 学院: "纺织学院", 立项: 2923 },
    // { 学院: "服装学院", 立项: 1723 },
    // { 学院: "电子信息学院", 立项: 3792 },
    // { 学院: "能源与环境学院", 立项: 4593 }
  ]
};
export const funnelData = {
  columns: ["学院", "经费"],
  rows: [
    // { 学院: "软件学院", 经费: 2792 },
    // { 学院: "计算机学院", 经费: 2530 },
    // { 学院: "服装学院", 经费: 1723 },
    // { 学院: "能源与环境学院", 经费: 1593 },
    // { 学院: "电子信息学院", 经费: 1393 },
    // { 学院: "纺织学院", 经费: 1223 }
  ]
};
