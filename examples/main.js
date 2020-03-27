import Vue from 'vue'
import App from './App.vue'

import { devicePlatform } from './base/device.js'

console.log('tag', devicePlatform())

new Vue({
  render: h => h(App)
}).$mount('#app')
