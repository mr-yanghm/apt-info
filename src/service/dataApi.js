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

  /**
   * 계산하여야 할 calcMonth 를 파라미터로 받아 현재 달을 기준으로 1달전, 2달전, 3달전 등의 누적 데이타중 평형별 최고값을 반환한다.
   * @param {*} calcMonth
   */
  this.highestPriceApt = async function (calcMonth = 1) {
    const yulgokaptAll = [];
    let yyyymm = new Date();
    for (let idx = 0; idx < calcMonth; idx++) {}

    return await this.search("202101").then((data) => {
      return this.highestPriceMonth(data);
    });
  };

  this.highestPriceMonth = function (items) {
    const sizeArr = new Set(
      items.map((data) => {
        return data.전용면적;
      })
    );
    const roomList = {};
    sizeArr.forEach((size) => {
      roomList[size] = items
        .filter((item) => {
          return item.전용면적 === size;
        })
        .map((data) => {
          return {
            ...data,
            거래금액: Number(data.거래금액.trim().replace(",", "")),
          };
        })
        .sort(function (a, b) {
          // 거래금액 내림차순으로 정렬 해서 가장 큰 금액 반환
          var aValue = a.거래금액;
          var bValue = b.거래금액;
          if (aValue > bValue) {
            return -1;
          }
          if (aValue < bValue) {
            return 1;
          }
          // a must be equal to b
          return 0;
        })[0];
    });
    return roomList;
  };

  /**
   * yyyymmdd 를 파라미터로 받아 조회한 달의 율곡 아파트 데이타를 반환한다.
   * @param {*} yyyymmdd
   */
  this.search = async function (yyyymm) {
    const response = await axios.get(
      `/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?serviceKey=8QZG3WqYe5WrxepvfzKZUeeWFuWsKfv%2BKKsnn%2FdpgPhqeLdF0LV6%2BiIZXT7HEieOBoTupfitXJ6dX5j4amsN0g%3D%3D&pageNo=1&numOfRows=10000&LAWD_CD=41410&DEAL_YMD=${yyyymm}`
    );

    // const result = convert.xml2json(resultXml, {});
    // const items = result.items.map((item) => ({
    //   ...item,
    //   id: item.id.videoId,
    // }));
    return response.data.response.body.items.item.filter((data) => {
      return data.아파트 === "율곡";
    });
  };
};

export default OpenAPI_APT;
