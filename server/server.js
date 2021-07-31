const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3001;
const axios = require("axios");

app.use(cors());
app.use(bodyParser.json());
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
app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
