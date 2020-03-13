const Mock = require("mockjs");
// eslint-disable-next-line no-unused-vars
const permissionList = [
  { id: 1, name: "查看用户", perCode: "user:select" },
  { id: 2, name: "更新用户", perCode: "user:update" },
  { id: 3, name: "新增用户", perCode: "user:insert" },
  { id: 4, name: "删除用户", perCode: "user:delete" },
  { id: 5, name: "查看角色", perCode: "role:select" },
  { id: 6, name: "更新角色", perCode: "role:update" },
  { id: 7, name: "新增角色", perCode: "role:insert" },
  { id: 8, name: "删除角色", perCode: "role:delete" },
  { id: 9, name: "查看权限", perCode: "permission:select" },
  { id: 10, name: "更新权限", perCode: "permission:update" },
  { id: 11, name: "新增权限", perCode: "permission:insert" },
  { id: 12, name: "删除权限", perCode: "permission:delete" }
];

export default {
  /** 权限列表 */
  select: Mock.mock(
    /\/permission\/all\?pageNum=[1-9]\d*&pageSize=[-1-9]\d*/,
    options => {
      const [pageNum, pageSize] = options.url.match(/[-1-9]\d*/g).map(item => {
        return parseInt(item);
      });
      const pages = Math.ceil(permissionList.length / 5);
      let list =
        pageSize > 0
          ? permissionList.slice((pageNum - 1) * pageSize, pageNum * pageSize)
          : permissionList;
      return {
        code: 200,
        msg: "success",
        data: {
          total: permissionList.length,
          list,
          pageNum,
          pageSize,
          pages
        }
      };
    }
  ),
  insert: Mock.mock("/permission/insert", "post", {
    code: 200,
    msg: "success",
    data: null
  }),
  update: Mock.mock(/\/permission\/update\/[1-9]\d*/, "put", {
    code: 200,
    msg: "success",
    data: null
  })
};
