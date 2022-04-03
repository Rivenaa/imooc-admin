const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
/**
 * 设置svg-sprite-loader
 * config为webpack配置对象
 * config.module 表示创建一个具名规则 可以定义规则
 * .rule 规则
 * .end 结束
 * .test(/\.svg$/) 解析.svg格式文件
 * .include.add(resolve('src/icons')) 解析的文件
 * .use('svg-sprite-loader') 新增一个解析的loader
 * .loader('svg-sprite-loader') 具体的loader
 * .options loader的配置
 */

module.exports = {
  chainWebpack(config) {
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
