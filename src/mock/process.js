import { getURLSearchParams } from "../util/url";
import competitionList from "./data/competitionList";

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
        // name: Mock.mock("@cname"),
        name: "idng",
        class: "RB软工卓越171",
        grade: "2017",
        college: "软件学院"
      });
    }
  )
};
