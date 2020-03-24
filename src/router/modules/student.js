export default [
  {
    path: "/enroll",
    name: "Student",
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/components/layout/Layout"),
    children: [
      {
        path: "list",
        name: "EnrollList",
        meta: {
          title: "竞赛报名",
          icon: "plus-box-multiple"
        },
        component: () =>
          import(
            /* webpackChunkName: "EnrollList" */ "../../views/student/EnrollList"
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
            /* webpackChunkName: "PersonalCompetition" */ "../../views/student/PersonalCompetition"
          )
      }
    ]
  }
];
