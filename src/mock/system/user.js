import { Mock } from "@/mock/mock";
import { getToken } from "@/util/cookie";
import user from "@/mock/data/user";
const permissions = {
  root: [
    "role:insert",
    "user:delete",
    "role:update",
    "permission:delete",
    "permission:insert",
    "permission:select",
    "user:select",
    "user:update",
    "role:delete",
    "user:insert",
    "permission:update",
    "role:select"
  ],
  admin: [
    "role:insert",
    "role:update",
    "permission:select",
    "user:select",
    "user:update",
    "user:insert",
    "role:select"
  ],
  user: ["permission:select", "user:select", "role:select"]
};

export default {
  /** 用户登陆 */
  login: Mock.mock(/\/user\/login/, options => {
    return {
      code: 200,
      data: {
        token: JSON.parse(options.body).account
      }
    };
  }),
  /** 获取用户信息 */
  getUserInfo: Mock.mock(/\/user\/info/, () => {
    const role = getToken();
    console.log(role);
    return {
      code: 200,
      data: {
        roles: [role],
        id: localStorage.getItem("id"),
        department: "软件学院",
        permissions: permissions[role],
        username: Mock.mock("@CNAME"),
        avatar:
          // "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
          "https://d36jcksde1wxzq.cloudfront.net/saas-mega/whiteFingerprint.png"
      }
    };
  }),
  /** 用户登出 */
  logout: Mock.mock(/\/logout/, {
    code: 200,
    meg: "logout success"
  }),
  /** 用户列表 */
  userAll: Mock.mock(
    /\/api\/user\/all\?pageNum=[1-9]\d*&pageSize=[1-9]\d*/,
    "get",
    {
      code: 200,
      meg: "success",
      data: {
        list: user,
        pageNum: 1,
        pageSize: 10,
        total: 5,
        pages: 1
      }
    }
  )
};
