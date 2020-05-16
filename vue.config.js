module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/dcms-fontend/" : "/",
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.plugins.delete("prefetch");
  },
  productionSourceMap: false,
  css: {
    sourceMap: false
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://kufjtcmu1j.54http.tech",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
