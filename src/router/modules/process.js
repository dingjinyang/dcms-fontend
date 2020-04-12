export default [
  {
    path: "/process",
    name: "Process",
    meta: {
      title: "过程管理",
      icon: "timeline",
      isGroup: true // 在根据角色筛选路由时，若原本有两个子路由，筛选后剩余一个，可保证父路由渲染为分组
    },
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/components/layout/Layout"),
    children: [
      {
        path: "launch/list",
        name: "CompetitionLaunchList",
        meta: {
          title: "竞赛发起",
          icon: "clock-start"
        },
        component: () =>
          import(
            /* webpackChunkName: "CompetitionLaunchList" */ "@/views/process/CompetitionLaunchList"
          )
      },
      {
        path: "manage/list",
        name: "CompetitionProcessList",
        meta: {
          title: "竞赛列表",
          icon: "clock-start"
        },
        component: () =>
          import(
            /* webpackChunkName: "CompetitionProcessList" */ "@/views/process/CompetitionProcessList"
          )
      },
      {
        path: "participant/list/:competitionId",
        name: "ConfirmParticipantList",
        hideInMenu: true,
        meta: {
          title: "竞赛过程及名单",
          icon: "clock-start"
        },
        component: () =>
          import(
            /* webpackChunkName: "ConfirmParticipantList" */ "@/views/process/ConfirmParticipantList"
          )
      }
    ]
  },
  {
    path: "/fund",
    name: "Fund",
    meta: {
      isGroup: false
    },
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/components/layout/Layout"),
    children: [
      {
        path: "list",
        name: "FundList",
        meta: {
          icon: "cash-usd-outline",
          title: "经费报销"
        },
        component: () =>
          import(
            /* webpackChunkName: "FundReimburseList" */ "@/views/process/FundReimburseList"
          )
      }
    ]
  }
];
