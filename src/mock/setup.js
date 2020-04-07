import competitionList from "./data/competitionList";
import { getURLSearchParams } from "../util/url";
import { pageHelper } from "../util/pageHelper";
import { Mock, responseData } from "@/mock/mock";

export default {
  /** 权限列表 */
  list: Mock.mock(
    /^\/selectCompetition\?pageNum=[1-9]\d*&pageSize=[1-9]\d*/,
    "get",
    options => {
      const { pageNum, pageSize } = getURLSearchParams(options.url);
      return responseData(pageHelper(competitionList, pageNum, pageSize));
    }
  ),
  one: Mock.mock(
    /^\/selectCompetitionById\?competitionId=[1-9]\d*/,
    "get",
    options => {
      const { competitionId: id } = getURLSearchParams(options.url);
      const arr = competitionList.filter(item => item.id === id);
      return responseData(arr[0]);
    }
  ),
  save: Mock.mock(/^\/saveCompetition/, "post", options =>
    responseData(options.body.id || 37)
  ),
  commit: Mock.mock(/^\/submitCompetition/, "post", options =>
    responseData(options.body.id || 37)
  ),
  delete: Mock.mock(/^\/teaDeleteCompetition/, "delete", responseData()),
  approval: Mock.mock(/^\/past/, "post", responseData()),
  reject: Mock.mock(/^\/comBack/, "post", responseData()),
  return: Mock.mock(/^\/comAlter/, "post", responseData()),
  collegeList: Mock.mock(
    /^\/teacherList\?pageNum=[1-9]\d*&pageSize=[1-9]\d*/,
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
  practiceList: Mock.mock(
    /^\/glkList\?pageNum=[1-9]\d*&pageSize=[1-9]\d*/,
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
