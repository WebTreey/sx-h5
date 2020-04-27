// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'


import Vue from 'vue'
import App from './App'
import router from './router'
import Bridge from './utils/bridge'
import store from './store'
import vueLazy from 'vue-lazyload'
import search from './components/search.vue'
import nav from './components/nav.vue'
import './utils/appFn'
import { Toast, Picker, InfiniteScroll, Checklist } from 'mint-ui'
import 'mint-ui/lib/style.css'
import './utils/rem'
import './assets/css/communal.css'
import './assets/css/main.css'
import './assets/font/iconfont.css'



require('es6-promise').polyfill();
Vue.prototype.$bridge = Bridge
Vue.prototype.$message = function (message) {
  Toast({
    message,
    position: 'center'
  })
}
router.beforeEach((to, form, next) => {
  let app = document.getElementById('app');
  if (to.meta.title == '订单中心') {

  } else {
    app.scrollTop = 0;
  }

  next()
})
Vue.component('search', search);
Vue.component('sd-nav', nav);
Vue.component(Picker.name, Picker);
Vue.component(Checklist.name, Checklist);
Vue.use(InfiniteScroll);
Vue.use(vueLazy, {
  preLoad: 1.3,
  error: require('./assets/images/errorImg.png'),
  loading: require('./assets/images/errorImg.png'),
  attempt: 1
})
Vue.config.productionTip = false
import Es6Promise from 'es6-promise'
Es6Promise.polyfill();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
