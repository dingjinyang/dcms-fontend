export default [
  {
    path: "/competitionManagement",
    name: "CompetitionManagement",
    meta: {
      title: "竞赛管理",
      icon: "television-guide",
      isGroup: true // 在根据角色筛选路由时，若原本有两个子路由，筛选后剩余一个，可保证父路由渲染为分组
    },
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/components/layout/Layout"),
    children: [
      {
        path: "list",
        name: "CompetitionList",
        meta: {
          title: "竞赛列表",
          icon: "id-card"
        },
        component: () =>
          import(
            /* webpackChunkName: "CompetitionLaunch" */ "@/views/competition/CompetitionList"
          )
      },
      {
        path: "launch",
        name: "CompetitionLaunch",
        hideInMenu: true,
        meta: {
          title: "竞赛发起",
          icon: "id-card"
        },
        component: () =>
          import(
            /* webpackChunkName: "CompetitionLaunch" */ "@/views/competition/CompetitionLaunch"
          )
      }
    ]
  }
];
