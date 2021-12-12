const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3001;
const axios = require("axios");

app.use(cors());
app.use(bodyParser.json());
/*
app.use("/api", (req, res) => {
  const yyyymm = req.query.yyyymm;
  console.log(`yyyymm : ${yyyymm}`);
  axios
    .get(
      "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?serviceKey=8QZG3WqYe5WrxepvfzKZUeeWFuWsKfv%2BKKsnn%2FdpgPhqeLdF0LV6%2BiIZXT7HEieOBoTupfitXJ6dX5j4amsN0g%3D%3D&pageNo=1&numOfRows=10000&LAWD_CD=41410",
      {
        params: { DEAL_YMD: yyyymm },
        headers: {
          "Access-Control-Allow-Origin": "*",
          // "Content-Security-Policy":"upgrade-insecure-requests"
        },
      }
    )
    .then(function (response) {
      //   console.log(`then : response: ${JSON.stringify(response)}`);
      //   const items = response.data.items;
      res.send({ items: response.data.response.body.items });
    })
    .catch(function (error) {
      console.log(error);
    });
});
*/
app.use("/api", (req, res) => {
  const yyyymm = req.query.yyyymm;
  const sigunguCode = req.query.sigunguCode;
  axios
    .get(
      `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?serviceKey=8QZG3WqYe5WrxepvfzKZUeeWFuWsKfv%2BKKsnn%2FdpgPhqeLdF0LV6%2BiIZXT7HEieOBoTupfitXJ6dX5j4amsN0g%3D%3D&pageNo=1&numOfRows=10000&LAWD_CD=${sigunguCode}`,
      {
        params: { DEAL_YMD: yyyymm },
        headers: {
          "Access-Control-Allow-Origin": "*",
          // "Content-Security-Policy":"upgrade-insecure-requests"
        },
      }
    )
    .then(function (response) {
      //   console.log(`then : response: ${JSON.stringify(response)}`);
      //   const items = response.data.items;
      res.send({ items: response.data.response.body.items });
    })
    .catch(function (error) {
      console.log(error);
    });
});

/**
 *  법정동 아파트 목록 조회
 */
app.use("/getList/apt/legaldong", (req, res) => {
  const serviceKey =
    "FKB4nUzgl%2F2KDIxKycYjpWxNKWMwQwnuX2nfUl2UvrXzA4A1FgqINFtkUXyGXo9WwYQJjZDjuWOZ81pQCrHHew%3D%3D";
  const bjdCode = req.query.bjdCode;
  const pageNo = req.query.pageNo;
  const numOfRows = req.query.numOfRows;
  console.log(`bjdCode : ${bjdCode}`);
  axios
    .get(
      `http://apis.data.go.kr/1613000/AptListService2/getLegaldongAptList?serviceKey=${serviceKey}`,
      {
        params: { bjdCode: bjdCode, pageNo: pageNo, numOfRows: numOfRows },
        headers: {
          "Access-Control-Allow-Origin": "*",
          // "Content-Security-Policy":"upgrade-insecure-requests"
        },
      }
    )
    .then(function (response) {
      //   console.log(`then : response: ${JSON.stringify(response)}`);
      //   const items = response.data.items;
      res.send({ items: response.data.response.body.items });
    })
    .catch(function (error) {
      console.log(error);
    });
});

/**
 * 시군구 아파트 목록 조회
 */
app.use("/getList/apt/sigungu", (req, res) => {
  const serviceKey =
    "FKB4nUzgl%2F2KDIxKycYjpWxNKWMwQwnuX2nfUl2UvrXzA4A1FgqINFtkUXyGXo9WwYQJjZDjuWOZ81pQCrHHew%3D%3D";
  const sigunguCode = req.query.sigunguCode;
  const pageNo = req.query.pageNo;
  const numOfRows = req.query.numOfRows;
  console.log(`sigunguCode : ${sigunguCode}`);
  axios
    .get(
      `http://apis.data.go.kr/1613000/AptListService2/getSigunguAptList?serviceKey=${serviceKey}`,
      {
        params: {
          sigunguCode: sigunguCode,
          pageNo: pageNo,
          numOfRows: numOfRows,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          // "Content-Security-Policy":"upgrade-insecure-requests"
        },
      }
    )
    .then(function (response) {
      //   console.log(`then : response: ${JSON.stringify(response)}`);
      //   const items = response.data.items;
      res.send({ items: response.data.response.body.items });
    })
    .catch(function (error) {
      console.log(error);
    });
});
app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
