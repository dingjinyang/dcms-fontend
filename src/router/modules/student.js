export default [
  {
    path: "/competition/enroll",
    name: "StudentEnrollList",
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/components/layout/Layout"),
    children: [
      {
        path: "list",
        name: "EnrollList",
        meta: {
          title: "竞赛列表",
          icon: "plus-box-multiple"
        },
        component: () =>
          import(
            /* webpackChunkName: "EnrollList" */ "@/views/student/enrollList/EnrollList"
          )
      }
    ]
  },
  {
    path: "/competition/enroll",
    name: "StudentEnrollForm",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/components/layout/Layout"),
    children: [
      {
        path: "form/:competitionId",
        name: "EnrollForm",
        meta: {
          title: "竞赛报名",
          icon: "plus-box-multiple"
        },
        component: () =>
          import(
            /* webpackChunkName: "EnrollForm" */ "@/views/student/enrollForm/EnrollForm"
          )
      }
    ]
  },
  {
    path: "/personal",
    name: "Student",
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/components/layout/Layout"),
    children: [
      {
        path: "competition",
        name: "PersonalCompetition",
        meta: {
          title: "我的竞赛",
          icon: "bag-personal"
        },
        component: () =>
          import(
            /* webpackChunkName: "CompetitionList" */ "@/views/student/personal/CompetitionList"
          )
      }
    ]
  }
];
