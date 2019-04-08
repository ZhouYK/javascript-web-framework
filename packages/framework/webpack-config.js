module.exports = {
  entry: {
    index: ['./client/index.jsx']
  },
  publicPaths: {
    dev: '/',
    test: '/',
    stage: '/',
    prod: '/',
    local: '/',
  },
  html: {
    title: '自定义'
  },
  devServer: {
    host: '0.0.0.0',
    port: '9999'
  }
}
