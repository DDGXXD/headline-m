import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less'
import 'amfe-flexible'
import './vant_ui/index.js'
import vueHljs from 'vue-hljs'
import hljs from 'highlight.js'
// 引入全部样式
import 'vant/lib/index.less'
Vue.use(vueHljs, { hljs })

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
