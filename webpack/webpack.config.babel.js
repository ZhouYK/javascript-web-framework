import getConfig from './webpack.config.prod.babel';

const publicPaths = {
  dev: '开发环境域名地址',
  test: '测试环境域名地址',
  stage: '预发环境域名地址',
  prod: '生产环境域名地址',
  local: '/',
};

export default (env = 'prod') => getConfig(publicPaths[env]);
