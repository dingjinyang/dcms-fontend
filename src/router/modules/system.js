export default [
  {
    path: "/system",
    name: "System",
    redirect: { name: "UserManagement" },
    meta: {
      title: "系统管理",
      icon: "television-guide",
      isGroup: true // 在根据角色筛选路由时，若原本有两个子路由，筛选后剩余一个，可保证父路由渲染为分组
    },
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/components/layout/Layout"),
    children: [
      {
        path: "user",
        name: "UserManagement",
        meta: { title: "用户管理", icon: "account-details", roles: [] },
        component: () =>
          import(/* webpackChunkName: "Form" */ "@/views/system/UserManagement")
      },
      {
        path: "role",
        name: "RoleManagement",
        meta: { title: "角色管理", icon: "account-question", roles: [] },
        component: () =>
          import(/* webpackChunkName: "Form" */ "@/views/system/RoleManagement")
      },
      {
        path: "permission",
        name: "PermissionManagement",
        meta: { title: "权限管理", icon: "shield-account", roles: [] },
        component: () =>
          import(
            /* webpackChunkName: "Form" */ "@/views/system/PermissionManagement"
          )
      }
    ]
  }
];
