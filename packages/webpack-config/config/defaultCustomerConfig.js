const publicPaths = {
  dev: '/',
  test: '/',
  stage: '/',
  prod: '/',
  local: '/',
}
module.exports = {
  entry: {},
  publicPaths,
  html: {
    title: '标题'
  },
  devServer: {
    hot: true, // 貌似没起作用
    host: '0.0.0.0',
    port: '8888',
    disableHostCheck: true,
    historyApiFallback: true,
    stats: 'minimal',
    compress: true,
    inline: true,
    publicPath: publicPaths.local
  }
};
