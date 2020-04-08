import { Mock, responseData } from "./mock";
import competitionList from "./data/competitionList";
import studentCompetitionList from "@/mock/data/studentCompetitionList";
import { pageHelper } from "@/util/pageHelper";
import { getURLSearchParams } from "@/util/url";

export default {
  signUpList: Mock.mock(/^\/startedCom/, "get", options => {
    const { pageNum, pageSize } = getURLSearchParams(options.url);
    return responseData(pageHelper(competitionList, pageNum, pageSize));
  }),
  personalList: Mock.mock(/^\/personCom/, "get", options => {
    const { pageNum, pageSize } = getURLSearchParams(options.url);
    return responseData(pageHelper(studentCompetitionList, pageNum, pageSize));
  }),
  getStudentInfoById: Mock.mock(/^\/findStudentById/, "get", options => {
    const { sno } = getURLSearchParams(options.url);
    return responseData({
      sno,
      name: Mock.mock("@cname"),
      class: "RB软工卓越171",
      grade: "2017",
      college: "软件学院"
    });
  })
};
