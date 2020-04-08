import { getURLSearchParams } from "../util/url";
import competitionList from "./data/competitionList";
import stageParticipants from "@/mock/data/stageParticipants";
import { pageHelper } from "@/util/pageHelper";
import { Mock, responseData } from "@/mock/mock";

export default {
  launch: Mock.mock(
    /^\/beginCom?competitionId=[1-9]\d*/,
    "get",
    responseData()
  ),
  getStudentCompetitionList: Mock.mock(
    /\/student\/competition\/all\?sno=[1-9]\d*&pageSize=[1-9]\d*/,
    "get",
    responseData(competitionList.filter(item => item.comStatus === 4))
  ),
  getStudentInfoById: Mock.mock(
    /\/student\/info\?sno=[1-9]\d*/,
    "get",
    options => {
      const { sno } = getURLSearchParams(options.url);
      return responseData({
        sno,
        name: Mock.mock("@cname"),
        class: "RB软工卓越171",
        grade: "2017",
        college: "软件学院"
      });
    }
  ),
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
