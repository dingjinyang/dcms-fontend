export default [
  {
    path: "/data",
    name: "Data",
    meta: {
      title: "数据分析",
      icon: "timeline"
    },
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/components/layout/Layout"),
    children: [
      {
        path: "analysis",
        name: "DataAnalysis",
        meta: {
          title: "竞赛数据",
          icon: "clock-start"
        },
        component: () =>
          import(
            /* webpackChunkName: "CompetitionAnalysis" */ "@/views/data/CompetitionAnalysis"
          )
      }
    ]
  }
];
