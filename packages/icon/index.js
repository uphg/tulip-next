import TIcon from './Icon.vue'

TIcon.install = function(Vue) {
  import("../../src/icon/tulip-icon.js")
  Vue.component(TIcon.name, TIcon)
}

export default TIcon
