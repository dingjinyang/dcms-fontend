/**
 * 竞赛立项状态
 * @type {({color: string, text: string, value: number})[]}
 */
export const competitionStatus = [
  { text: "无状态", value: 0, color: "gray" },
  { text: "未提交", value: 1, color: "text" },
  { text: "待审批", value: 2, color: "primary" },
  { text: "待修改", value: 3, color: "warning" },
  { text: "被驳回", value: 4, color: "error" },
  { text: "待审批", value: 5, color: "primary" },
  { text: "待修改", value: 6, color: "success" },
  { text: "被驳回", value: 7, color: "error" },
  { text: "已通过", value: 8, color: "success" },
  { text: "进行中", value: 9, color: "purple" },
  { text: "已结束", value: 10, color: "gray" },
  { text: "待报销", value: 11, color: "brown" },
  { text: "已报销", value: 12, color: "blue-grey" }
];

export const colleges = [
  "中原工学院全体学生",
  "外国语学院",
  "建筑工程学院",
  "新闻与传播学院",
  "服装学院",
  "机电学院",
  "材料与化工学院",
  "法学院",
  "理学院",
  "电子信息学院",
  "纺织学院",
  "经济管理学院",
  "能源与环境学院",
  "艺术设计学院",
  "计算机学院",
  "软件学院",
  "马克思主义学院"
];

export const competitionLevels = ["校级", "院级"];

export const competitionSearchForm = {
  year: new Date().getFullYear(),
  department: null,
  comName: null,
  sponsor: null
};

export const competitionStage = {
  stage: 1, //阶段级别
  stageName: "", //阶段名称
  startTime: "",
  endTime: ""
};

export const competitionForm = {
  comName: "", //竞赛名称
  department: "", //申报部门
  comLevel: "院级", //比赛等级
  principalId: null, //负责人工号
  principalPhone: null, //负责人联写方式
  teams: 1, //参赛队伍数量
  participants: 1, //参赛人数
  awards: "", //拟设奖项及数目
  description: "", //竞赛描述
  flow: "", //赛事流程
  comCondition: "中原工学院全体学生", //参赛条件
  comStatus: 1, //立项申请状态
  comDate: new Date().toISOString().substring(0, 10), //立项时间
  sponsor: "", //主办单位
  budget: 0,
  lastHandler: 1,
  collegeModifySuggest: null,
  practiceModifySuggest: null,
  currentStage: 1,
  competitionStages: [{ ...competitionStage }]
};
