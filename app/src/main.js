import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Peer from 'peerjs'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

let peerServerConfig = {
  host: process.env.VUE_APP_PEER_SERVER_HOST, 
  port: process.env.VUE_APP_PEER_SERVER_PORT, 
  path: process.env.VUE_APP_PEER_SERVER_PATH,
  debug: 3 
}

if (process.env.NODE_ENV === 'production') {
  peerServerConfig = {
    host: process.env.VUE_APP_PEER_SERVER_HOST,
    path: process.env.VUE_APP_PEER_SERVER_PATH,
    debug: 3, 
  }
}

window.peer = new Peer(peerServerConfig)
