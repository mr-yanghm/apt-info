const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "http://apt.cuvnd.com:3001/api",
    createProxyMiddleware({
      target:
        "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?serviceKey=8QZG3WqYe5WrxepvfzKZUeeWFuWsKfv%2BKKsnn%2FdpgPhqeLdF0LV6%2BiIZXT7HEieOBoTupfitXJ6dX5j4amsN0g%3D%3D&pageNo=1&numOfRows=10000&LAWD_CD=41410",
      changeOrigin: true,
      pathRewrite: { "http://apt.cuvnd.com:3001/api": "" },
    })
  );
};
