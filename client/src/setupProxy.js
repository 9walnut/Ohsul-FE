const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const apiURL = process.env.REACT_APP_BACKEND_URL;

  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );

  // app.use(
  //   createProxyMiddleware("/api/register", {
  //     target: "http://localhost:8080",
  //     changeOrigin: true,
  //   })
  // );

  // app.use(
  //   createProxyMiddleware("/api/login", {
  //     target: "http://localhost:8080",
  //     changeOrigin: true,
  //   })
  // );
};
