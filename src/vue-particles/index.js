/**
 * Created by hongjiayong on 2017/5/15.
 */
import particles from './vue-particles.vue'

const VueParticles = {

  install (Vue, options) {
    Vue.component('vue-particles', particles)
  }

}

export default VueParticles
