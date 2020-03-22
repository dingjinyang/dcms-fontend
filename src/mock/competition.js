import competitionDetail from "./data/competitionDetail";
import competitionList from "./data/competitionList";
import { getURLSearchParams } from "../util/url";
import { pageHelper } from "../util/pageHelper";

const Mock = require("mockjs");
const responseData = (data = null) => ({
  code: 200,
  msg: "success",
  data
});

export default {
  /** 权限列表 */
  competitionAll: Mock.mock(
    /\/competition\/all\?pageNum=[1-9]\d*&pageSize=[1-9]\d*/,
    "get",
    options => {
      const { pageNum, pageSize } = getURLSearchParams(options.url);
      return responseData(pageHelper(competitionList, pageNum, pageSize));
    }
  ),
  competitionDetail: Mock.mock(
    /\/competition\/detail\?id=[1-9]\d*/,
    "get",
    responseData(competitionDetail)
  ),
  competitionSave: Mock.mock(/\/competition\/save/, "post", responseData(null)),
  competitionCommit: Mock.mock(
    /\/competition\/commit/,
    "post",
    responseData(null)
  ),
  competitionApproval: Mock.mock(
    /\/competition\/approval\/list\?pageNum=[1-9]\d*&pageSize=[1-9]\d*/,
    "get",
    options => {
      const { pageNum, pageSize } = getURLSearchParams(options.url);
      return responseData(
        pageHelper(
          competitionList.filter(
            item => item.status === 1 || item.status === 4
          ),
          pageNum,
          pageSize
        )
      );
    }
  )
};
