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
    options => {
      const { id } = getURLSearchParams(options.url);
      const arr = competitionList.filter(item => item.id === id);
      return responseData(arr[0]);
    }
  ),
  competitionSave: Mock.mock(/\/competition\/save/, "post", responseData(null)),
  competitionCommit: Mock.mock(
    /\/competition\/commit/,
    "post",
    responseData(null)
  ),
  collegeApproval: Mock.mock(
    /\/college\/approval\/list\?pageNum=[1-9]\d*&pageSize=[1-9]\d*/,
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
  ),
  collegeApprovalBatch: Mock.mock(
    "/college/approval/batch",
    "post",
    responseData(null)
  ),
  practiceApprovalList: Mock.mock(
    /\/practice\/approval\/list\?pageNum=[1-9]\d*&pageSize=[1-9]\d*/,
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
  ),
  practiceApprovalBatch: Mock.mock(
    "/practice/approval/batch",
    "post",
    responseData(null)
  )
};
