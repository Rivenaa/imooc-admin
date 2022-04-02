import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入全局样式
import './styles/index.scss'
// 导入svgicon
import installIcons from '@/icons'

const app = createApp(App)

/* 全局注册SvgIcon组件 */
installIcons(app)

app.use(store).use(router).use(ElementPlus).mount('#app')
