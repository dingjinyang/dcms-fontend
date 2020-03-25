import { getURLSearchParams } from "../util/url";
import { pageHelper } from "../util/pageHelper";
import competitionList from "./data/competitionList";

const Mock = require("mockjs");
const responseData = (data = null) => ({
  code: 200,
  msg: "success",
  data
});

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
  )
};
