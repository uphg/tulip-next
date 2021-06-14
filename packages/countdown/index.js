import TCountdown from './Countdown.vue'

TCountdown.install = function(Vue) {
  Vue.component(TCountdown.name, TCountdown)
}

export default TCountdown
