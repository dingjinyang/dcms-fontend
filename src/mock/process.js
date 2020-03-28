import { getURLSearchParams } from "../util/url";
import competitionList from "./data/competitionList";
import competitionStudentList from "@/mock/data/competitionStudentList";
import { pageHelper } from "@/util/pageHelper";

const Mock = require("mockjs");
const responseData = (data = null) => ({
  code: 200,
  msg: "success",
  data
});

export default {
  getStudentCompetitionList: Mock.mock(
    /\/student\/competition\/all?sno=[1-9]\d*&pageSize=[1-9]\d*/,
    "get",
    responseData(competitionList.filter(item => item.status === 4))
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
  getParticipateEntry: Mock.mock(
    /\/participate\/entry\?sno=[1-9]\d*&pageNum=[1-9]\d*&pageSize=[1-9]\d*/,
    "get",
    options => {
      const { pageNum, pageSize } = getURLSearchParams(options.url);
      return responseData(
        pageHelper(competitionStudentList, pageNum, pageSize)
      );
    }
  )
};
