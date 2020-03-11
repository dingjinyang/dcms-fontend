module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/dcms-font/" : "/",
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.plugins.delete("prefetch");
  },
  productionSourceMap: false,
  css: {
    sourceMap: false
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8088",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
