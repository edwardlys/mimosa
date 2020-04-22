<template>
  <div>
  </div>
</template>

<script>
import Peer from 'peerjs'

export default {
  name: 'Home',
  created () {
    window.peer = new Peer({ host: 'localhost', port: 9000, path: '/myapp'})

    window.peer.on('open', this.onPeerOpen)
    window.peer.on('connection', this.onPeerConn)
  },
  methods: {
    onPeerOpen (id) {
      console.log('connection ID:', id)
    },
    onPeerConn (conn) {
      console.log(conn)
    }
  }
}
</script>
