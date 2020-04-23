<template>
  <div>
    <div>
      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          <img src="favicon.ico" width="30" height="30" alt="">
        </a>
      </nav>
    </div>

    <br>

    <div class="container-lg">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <form class="container">
                <div class="row">
                  <div class="col-md form-group">
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" id="uuid" v-model="UUID" readonly>
                      <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" v-on:click="copyUUID">Copy</button>
                      </div>
                    </div>
                  </div>

                  <div class="col-md form-group">
                      <input type="text" placeholder="Peer ID" class="form-control" id="peer-uuid" v-model="peerUUID" :disabled="lockPeer">
                  </div>
                </div>
                <div class="row" v-if="!lockPeer">
                  <button type="button" class="col btn btn-primary" :disabled="!peerUUID || lockPeer" v-on:click="connectPeer">Connect</button>
                </div>
                <div class="row">
                  <div class="col">
                    <h1 style="color: green" v-if="lockPeer">Connected!</h1>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <br>

          <div class="card">
            <div class="card-body">
              <form class="container">
                <div class="row">
                  <div class="col form-group">
                    <div class="input-group mb-3">
                      <textarea class="form-control" id="message" v-model="message" :disabled="!conn"></textarea>
                      <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" v-on:click="sendMessage" :disabled="!conn">Send</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Peer from 'peerjs'

export default {
  name: 'Home',
  data () {
    return {
      UUID: null,
      peerUUID: null,
      conn: null,
      connectionStatus: 0,
      message: '',
      lockPeer: false
    }
  },
  created () {
    window.peer = new Peer({ host: 'localhost', port: 9000, debug: 3, path: '/myapp'})

    window.peer.on('open', this.onPeerOpen)
    window.peer.on('connection', this.onPeerConn)
  },
  methods: {
    onPeerOpen (id) {
      this.UUID = id
    },
    onPeerConn (conn) {
      this.conn = conn
      this.conn.on('data', this.onConnReceiveData)
    },
    copyUUID () {
      var UUIDInput = document.getElementById("uuid")

      UUIDInput.select()
      UUIDInput.setSelectionRange(0, 99999)

      document.execCommand("copy")
    },
    pasteUUID () {
      let self = this
      let text = navigator.clipboard.readText()
      text.then(function (item) {
        self.peerUUID = item.trim()
      })
    },
    connectPeer () {
      this.conn = window.peer.connect(this.peerUUID)
      this.conn.on('open', this.onConnOpen)
      this.conn.on('data', this.onConnReceiveData)
    },
    onConnOpen () {
      this.conn.send({secretUUID: this.UUID})
      this.lockPeer = true
    },
    sendMessage () {
      this.conn.send({string: this.message})
      this.message = ''
    },
    onConnReceiveData (data) {
      if ('secretUUID' in data) {
        this.peerUUID = data.secretUUID
        this.lockPeer = true
      } else {
        alert(data.string)
      }
    }
  }
}
</script>
