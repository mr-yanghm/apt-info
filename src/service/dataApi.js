import axios from "axios";

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

  this.getFilterAptInfo = function ({
    items,
    filterAptName = "",
    filterAptSize = "",
  }) {
    // console.log(
    //   `filterAptName : ${filterAptName}, filterAptSize : ${filterAptSize}`
    // );
    const filterItems = items
      .filter((data) => {
        // return data.아파트 === filterAptName;
        if (filterAptName && filterAptSize) {
          return (
            data.아파트.indexOf(filterAptName) > -1 &&
            data.전용면적 === Number(filterAptSize)
          );
        } else if (filterAptName) {
          return data.아파트.indexOf(filterAptName) > -1;
        } else if (filterAptSize) {
          return data.전용면적 === Number(filterAptSize);
        } else {
          return data;
        }
        // if (filterAptSize) {
        //   return (
        //     data.아파트.indexOf(filterAptName) > -1 &&
        //     data.전용면적 === Number(filterAptSize)
        //   );
        // } else {
        //   return data.아파트.indexOf(filterAptName) > -1;
        // }
      })
      .map((data) => {
        return {
          // 거래금액: Number(data.거래금액.trim().replace(",", "")),
          거래금액: data.거래금액,
          년: data.년,
          월: data.월,
          일: data.일,
          전용면적: data.전용면적,
          층: data.층,
          아파트: data.아파트,
          거래년월:
            data.년 +
            String(data.월).padStart(2, "0") +
            String(data.일).padStart(2, "0"),
        };
      });

    return {
      highestPriceApts: this.highestPriceApts({ items: filterItems }),
      newestDealApts: this.newestDealApts({ items: filterItems }),
    };
  };

  /**
   * 계산하여야 할 calcMonth 를 파라미터로 받아 현재 달을 기준으로 1달전, 2달전, 3달전 등의 누적 데이타중 평형별 최고값을 반환한다.
   * @param {*} calcMonth
   */
  this.getAllAptInfo = async function ({ calcMonth = 1 }) {
    let now = new Date();

    const items = [];

    for (let idx = 0; idx <= calcMonth; idx++) {
      now = new Date(now.setMonth(now.getMonth() - (idx > 1 ? 1 : idx)));
      const searchYYYYMM =
        String(now.getFullYear()) + String(now.getMonth() + 1).padStart(2, "0");

      await this.search(searchYYYYMM).then((data) => {
        items.push(...data);
      });
    }

    return items;
  };

  this.highestPriceApts = function ({ items }) {
    const sizeArr = new Set(
      items.map((data) => {
        return data.전용면적;
      })
    );
    const highestRoomList = [];
    sizeArr.forEach((size) => {
      highestRoomList.push(
        items
          .filter((item) => {
            return item.전용면적 === size;
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
          })[0]
      );
    });

    return highestRoomList.sort(function (a, b) {
      // 전용면적 오름차순으로 정렬
      var aValue = a.전용면적;
      var bValue = b.전용면적;
      if (aValue > bValue) {
        return 1;
      }
      if (aValue < bValue) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  };

  /**
   * 거래년월 내림차순으로 정렬 해서 가장 최신 거래 반환
   * @param {*} items
   */
  this.newestDealApts = function ({ items }) {
    const sizeArr = new Set(
      items.map((data) => {
        return data.전용면적;
      })
    );

    const highestRoomList = [];
    sizeArr.forEach((size) => {
      highestRoomList.push(
        items
          .filter((item) => {
            return item.전용면적 === size;
          })
          .sort(function (a, b) {
            // 거래금액 내림차순으로 정렬 해서 가장 큰 금액 반환
            const aValue = a.거래금액;
            const bValue = b.거래금액;
            if (aValue > bValue) {
              return -1;
            }
            if (aValue < bValue) {
              return 1;
            }
            // a must be equal to b
            return 0;
          })[0]
      );
    });

    // console.log(highestRoomList);

    const newestRoomList = [];
    sizeArr.forEach((size) => {
      newestRoomList.push(
        items
          .filter((item) => {
            return item.전용면적 === size;
          })
          .map((newestData) => {
            const highestDataValue = highestRoomList.filter(
              (highestData) => highestData.전용면적 === newestData.전용면적
            )[0].거래금액;
            return {
              ...newestData,
              최고가: highestDataValue,
            };
          })
          .sort(function (a, b) {
            const aValue = a.거래년월;
            const bValue = b.거래년월;
            if (aValue > bValue) {
              return -1;
            }
            if (aValue < bValue) {
              return 1;
            }
            // a must be equal to b
            return 0;
          })[0]
      );
    });

    return newestRoomList.sort(function (a, b) {
      // 전용면적 오름차순으로 정렬
      const aValue = a.전용면적;
      const bValue = b.전용면적;
      if (aValue > bValue) {
        return 1;
      }
      if (aValue < bValue) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  };

  /**
   * yyyymmdd 를 파라미터로 받아 조회한 달의 율곡 아파트 데이타를 반환한다.
   * @param {*} yyyymmdd
   */
  this.search = async function (yyyymm) {
    // console.log(`call yyyymm : ${yyyymm}`);
    const response = await axios.get(
      `/api/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?serviceKey=8QZG3WqYe5WrxepvfzKZUeeWFuWsKfv%2BKKsnn%2FdpgPhqeLdF0LV6%2BiIZXT7HEieOBoTupfitXJ6dX5j4amsN0g%3D%3D&pageNo=1&numOfRows=10000&LAWD_CD=41410&DEAL_YMD=${yyyymm}`
    );

    // const result = convert.xml2json(resultXml, {});
    // const items = result.items.map((item) => ({
    //   ...item,
    //   id: item.id.videoId,
    // }));
    return response.data.response.body.items.item.map((data) => {
      return {
        ...data,
        거래금액: Number(data.거래금액.trim().replace(",", "")),
      };
    });
  };
};

export default OpenAPI_APT;
