"use strict";
import axios from "axios";
import convert from "xml-js";

const OpenAPI_APT = function () {
  const requestOptions = {
    method: "GET",
  };
  this.mostPopular = async function () {
    const response = await fetch(
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyAU1YyXdo8gO7kYc0Ypy0f66VBGja-8ofU",
      requestOptions
    );

    const result = await response.json();
    return result.items;
  };

  this.search = async function (yyyymm) {
    const response = await axios.get(
      `/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?serviceKey=8QZG3WqYe5WrxepvfzKZUeeWFuWsKfv%2BKKsnn%2FdpgPhqeLdF0LV6%2BiIZXT7HEieOBoTupfitXJ6dX5j4amsN0g%3D%3D&pageNo=1&numOfRows=10000&LAWD_CD=41410&DEAL_YMD=${yyyymm}`
    );

    // const result = convert.xml2json(resultXml, {});
    // const items = result.items.map((item) => ({
    //   ...item,
    //   id: item.id.videoId,
    // }));
    return response.data.response.body;
  };
};

export default OpenAPI_APT;
