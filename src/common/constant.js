/**
 * 竞赛立项状态
 * @type {({color: string, text: string, value: string})[]}
 */
export const competitionStatus = [
  { text: "未提交", value: 0, color: "text" },
  { text: "待审批", value: 1, color: "primary" },
  { text: "待修改", value: 2, color: "warning" },
  { text: "被驳回", value: 3, color: "error" },
  { text: "已通过", value: 4, color: "success" },
  { text: "进行中", value: 5, color: "light-blue" }
];

export const colleges = ["软件学院", "计算机学院", "纺织学院", "马克思学院"];

export const competitionLevels = ["国家级", "省级", "校级", "院级"];
