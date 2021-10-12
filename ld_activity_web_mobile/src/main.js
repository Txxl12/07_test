import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
import store from './store'
import "@/styles/index.scss";
// import Vant from "vant";
import "vant/lib/index.css";
import { getOpenId } from './Api/index'

var encodeurl = encodeURIComponent(location.href);
var code = ((location.href.substring(location.href.lastIndexOf("code"))).split("="))[1];
console.log(encodeurl);
let authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx88b54a49878bb5b8&redirect_uri=${encodeurl}&response_type=code&scope=snsapi_base#wechat_redirect`;
if (!code) {
  window.location.href = authUrl;
} else {
  code = code.split("&")[0]
  console.log(code);
  getOpenId({ code }).then((res) => {
    console.log(res)
  })
}

// Vue.use(Vant);
Vue.prototype.$store = store
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.title) {

  }
  next()
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
