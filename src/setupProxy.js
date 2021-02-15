const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage",
      changeOrign: true,
    })
  );
};
