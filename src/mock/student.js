import { Mock, responseData } from "./mock";
import competitionList from "./data/competitionList";
import { pageHelper } from "@/util/pageHelper";
import { getURLSearchParams } from "@/util/url";

export default {
  studentCompetitionList: Mock.mock(/^\/startedCom/, "get", options => {
    const { pageNum, pageSize } = getURLSearchParams(options.url);
    return responseData(pageHelper(competitionList, pageNum, pageSize));
  })
};
