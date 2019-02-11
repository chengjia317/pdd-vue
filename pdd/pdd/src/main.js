import Vue from 'vue'
import App from './App'

// 引入路由对象
import router from './router/index'

import store from './store'


import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  loading:require('./../static/loading.gif')
})

// 引入顶部的tab
import LyTab from 'ly-tab'
Vue.use(LyTab);

// 引入字体图标
import './common/css/style.css'

import "./common/stylus/mixins.styl"

import { Actionsheet } from 'mint-ui';
Vue.component(Actionsheet.name, Actionsheet);

import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);

new Vue({
  el: '#app',
  router,
  store,
  render: h=>h(App)
});
