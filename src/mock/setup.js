import competitionList from "./data/competitionList";
import { getURLSearchParams } from "../util/url";
import { pageHelper } from "../util/pageHelper";
import { Mock, responseData } from "@/mock/mock";

export default {
  /** 权限列表 */
  all: Mock.mock(
    /^\/selectCompetition\?pageNum=[1-9]\d*&pageSize=[1-9]\d*/,
    "get",
    options => {
      const { pageNum, pageSize } = getURLSearchParams(options.url);
      return responseData(pageHelper(competitionList, pageNum, pageSize));
    }
  ),
  detail: Mock.mock(
    /^\/selectCompetitionById\?competitionId=[1-9]\d*/,
    "get",
    options => {
      const { competitionId: id } = getURLSearchParams(options.url);
      const arr = competitionList.filter(item => item.id === id);
      return responseData(arr[0]);
    }
  ),
  save: Mock.mock(/^\/saveCompetition/, "post", responseData(37)),
  commit: Mock.mock(/^\/submitCompetition/, "post", options =>
    responseData(options.body.id || 12)
  ),
  delete: Mock.mock(/^\/teaDeleteCompetition/, "delete", responseData()),

  collegeApproval: Mock.mock(
    /^\/college\/approval\/list\?pageNum=[1-9]\d*&pageSize=[1-9]\d*/,
    "get",
    options => {
      const { pageNum, pageSize } = getURLSearchParams(options.url);
      return responseData(
        pageHelper(
          competitionList.filter(item => item.comStatus === 2),
          pageNum,
          pageSize
        )
      );
    }
  ),
  approvalOrReject: Mock.mock(
    /^\/teaChange\?competitionId=[1-9]\d*&stage=[1-9]\d*/,
    "get",
    responseData()
  ),
  return: Mock.mock(/^\/competition\/return/, "post", responseData()),
  practiceApprovalList: Mock.mock(
    /^\/practice\/list\?pageNum=[1-9]\d*&pageSize=[1-9]\d*/,
    "get",
    options => {
      const { pageNum, pageSize } = getURLSearchParams(options.url);
      return responseData(
        pageHelper(
          competitionList.filter(item => item.comStatus === 5),
          pageNum,
          pageSize
        )
      );
    }
  )
};
