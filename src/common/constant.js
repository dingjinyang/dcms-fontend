/**
 * 竞赛立项状态
 * @type {({color: string, text: string, value: string})[]}
 */
export const competitionStatus = [
  { text: "未提交", value: 0, color: "text" },
  { text: "待审核", value: 1, color: "primary" },
  { text: "待修改", value: 2, color: "warning" },
  { text: "被驳回", value: 3, color: "error" },
  { text: "审核通过", value: 4, color: "success" }
];
