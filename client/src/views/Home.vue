<template>
  <div>
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

          <div class="card">
            <div class="card-body">
              <form class="container">
                <div class="row">
                  <div class="col form-group">
                    <div class="input-group mb-3">
                      <div>
                        <div id="video-canvas" width="320" height="240">
                        </div>
                      </div>
                      <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" v-on:click="callMedia" :disabled="!conn">Send</button>
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
    window.peer = new Peer({
      host: process.env.VUE_APP_PEER_SERVER_HOST, 
      port: process.env.VUE_APP_PEER_SERVER_PORT, 
      debug: 3, 
      path: process.env.VUE_APP_PEER_SERVER_PATH
    })

    window.peer.on('open', this.onPeerOpen)
    window.peer.on('connection', this.onPeerConn)

    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
    window.peer.on('call', function(call) {
      getUserMedia({video: true, audio: true}, function(stream) {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', function(remoteStream) {
          let videoCanvas = document.getElementById('video-canvas');

          let video = document.createElement('video');
          video.srcObject = remoteStream;
          video.play();
          videoCanvas.appendChild(video)
        });
      }, function(err) {
        console.log('Failed to get local stream' ,err);
      });
    });
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
    },
    callMedia () {
      let self = this
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      // let urlObject = window.URL;
      getUserMedia({video: true, audio: true}, function(stream) {
        window.peer.call(self.peerUUID, stream);
        // call.on('stream', function(remoteStream) {
        //   let video = document.getElementById('video');
        //   console.log('test');
        //   console.log(urlObject);
        //     video.src = urlObject.createObjectURL(remoteStream);
        //   video.play();
        // });
      }, function(err) {
        console.log('Failed to get local stream' ,err);
      });
    }
  }
}
</script>
