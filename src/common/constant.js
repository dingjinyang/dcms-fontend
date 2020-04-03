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

export const competitionLevels = ["校级", "院级"];

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
  comDate: "", //立项时间
  sponsor: "", //主办单位
  budget: 0,
  lastHandler: 1,
  collegeModifySuggest: null,
  practiceModifySuggest: null,
  currentStage: 1,
  competitionStages: [competitionStage]
};
