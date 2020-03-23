export default [
  {
    path: "/competitionSetup",
    name: "competitionSetup",
    meta: {
      title: "竞赛立项",
      icon: "television-guide",
      isGroup: true // 在根据角色筛选路由时，若原本有两个子路由，筛选后剩余一个，可保证父路由渲染为分组
    },
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/components/layout/Layout"),
    children: [
      {
        path: "list",
        name: "CompetitionApplyList",
        meta: {
          title: "立项申请",
          icon: "id-card"
        },
        component: () =>
          import(
            /* webpackChunkName: "CompetitionApplyList" */ "../../views/competitionSetup/CompetitionApplyList"
          )
      },
      {
        path: "apply",
        name: "CompetitionApply",
        hideInMenu: true,
        meta: {
          title: "新的申请",
          icon: "id-card"
        },
        component: () =>
          import(
            /* webpackChunkName: "CompetitionForm" */ "../../views/competitionSetup/form/CompetitionForm"
          )
      },
      {
        path: "edit/:competitionId",
        name: "CompetitionEdit",
        hideInMenu: true,
        meta: {
          title: "编辑申请",
          icon: "id-card"
        },
        component: () =>
          import(
            /* webpackChunkName: "CompetitionForm" */ "../../views/competitionSetup/form/CompetitionForm"
          )
      },
      {
        path: "revise/:competitionId",
        name: "CompetitionRevise",
        hideInMenu: true,
        meta: {
          title: "修改申请",
          icon: "id-card"
        },
        component: () =>
          import(
            /* webpackChunkName: "CompetitionForm" */ "../../views/competitionSetup/form/CompetitionForm"
          )
      },
      {
        path: "detail/:competitionId",
        name: "CompetitionDetail",
        hideInMenu: true,
        meta: {
          title: "立项详情",
          icon: "id-card"
        },
        component: () =>
          import(
            /* webpackChunkName: "CompetitionForm" */ "../../views/competitionSetup/form/CompetitionForm"
          )
      },
      {
        path: "approval/list",
        name: "CollegeApprovalList",
        meta: {
          title: "学院审批",
          icon: "id-card"
        },
        component: () =>
          import(
            /* webpackChunkName: "CollegeApprovalList" */ "../../views/competitionSetup/CollegeApprovalList"
          )
      },
      {
        path: "approval/:competitionId",
        name: "CollegeApproval",
        hideInMenu: true,
        meta: {
          title: "学院审批",
          icon: "id-card"
        },
        component: () =>
          import(
            /* webpackChunkName: "CompetitionForm" */ "../../views/competitionSetup/form/CompetitionForm"
          )
      }
    ]
  }
];
