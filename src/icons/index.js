import SvgIcon from '@/components/SvgIcon'

/* 创建依赖文件 */
const svgRequire = require.context('./svg', false, /\.svg$/)

/* 完成本地svg的导入 */
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon))

/* 全局注册组件 */

export default (app) => {
  app.component('svg-icon', SvgIcon)
}
