// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueParticles from './vue-particles'
import VueSimplemde from './vue-simplemde'
import AwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueParticles)
Vue.use(VueSimplemde)
Vue.use(AwesomeSwiper)

Vue.config.productionTip = false

require('../node_modules/jquery/dist/jquery.min.js')
require('../node_modules/animate.css/animate.min.css')
require('../node_modules/lodash/lodash.min.js')
require('../node_modules/prismjs/themes/prism-twilight.css')
require('../node_modules/prismjs/prism')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
