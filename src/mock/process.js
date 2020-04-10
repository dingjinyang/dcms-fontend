import { getURLSearchParams } from "../util/url";
import stageParticipants from "@/mock/data/stageParticipants";
import { pageHelper } from "@/util/pageHelper";
import { Mock, responseData } from "@/mock/mock";
import competitionList from "./data/competitionList";

export default {
  launchList: Mock.mock(/^\/beginList/, "get", options => {
    const { pageNum, pageSize } = getURLSearchParams(options.url);
    return responseData(
      pageHelper(
        competitionList.filter(e => e.comStatus === 8),
        pageNum,
        pageSize
      )
    );
  }),
  launch: Mock.mock(/^\/beginCom/, "get", responseData()),
  processList: Mock.mock(/^\/controlList/, "get", options => {
    const { pageNum, pageSize } = getURLSearchParams(options.url);
    return responseData(pageHelper(competitionList, pageNum, pageSize));
  }),
  getStageParticipants: Mock.mock(/^\/teaControlComList/, "get", options => {
    const { stage, pageNum, pageSize } = getURLSearchParams(options.url);
    return responseData(
      pageHelper(stageParticipants[stage - 1], pageNum, pageSize)
    );
  })
};
