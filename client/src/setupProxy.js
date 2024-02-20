const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const apiURL = process.env.REACT_APP_BACKEND_URL;

  app.use(
    createProxyMiddleware("/api/register", {
      target: "https://localhost:8080",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/api/login", {
      target: "https://localhost:8080",
      changeOrigin: true,
    })
  );
};
