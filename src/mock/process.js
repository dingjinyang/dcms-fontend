import { getURLSearchParams } from "../util/url";
import stageParticipants from "@/mock/data/stageParticipants";
import { pageHelper } from "@/util/pageHelper";
import { Mock, responseData } from "@/mock/mock";
import CompetitionList from "./data/competitionList";

export default {
  launchList: Mock.mock(/^\/beginList/, "get", options => {
    const { pageNum, pageSize } = getURLSearchParams(options.url);
    return responseData(
      pageHelper(
        CompetitionList.filter(e => e.comStatus === 8),
        pageNum,
        pageSize
      )
    );
  }),
  launch: Mock.mock(/^\/beginCom/, "get", responseData()),
  getStageParticipants: Mock.mock(
    /\/competition\/stage\/participants\?competitionId=[1-9]\d*&stage=[1-9]\d*&pageNum=[1-9]\d*&pageSize=[1-9]\d*/,
    "get",
    options => {
      const { stage, pageNum, pageSize } = getURLSearchParams(options.url);
      return responseData(
        pageHelper(stageParticipants[stage - 1], pageNum, pageSize)
      );
    }
  )
};
