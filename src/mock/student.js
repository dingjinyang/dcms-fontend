import { getURLSearchParams } from "../util/url";
import { pageHelper } from "../util/pageHelper";
import competitionList from "./data/competitionList";
import { Mock, responseData } from "./mock";
import studentCompetitionList from "./data/studentCompetitionList";

export default {
  launchList: Mock.mock(
    /\/launch\/all\?pageNum=[1-9]\d*&pageSize=[1-9]\d*/,
    "get",
    options => {
      const { pageNum, pageSize } = getURLSearchParams(options.url);
      return responseData(
        pageHelper(
          competitionList.filter(item => item.status === 4),
          pageNum,
          pageSize
        )
      );
    }
  ),
  studentCompetitionList: Mock.mock(
    /\/student\/competition\/all\?sno=[1-9]\d*/,
    "get",
    responseData(studentCompetitionList)
  )
};
