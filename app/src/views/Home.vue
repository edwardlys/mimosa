<template>
    <div class="container">
        <div class="navbar">
            <div>
                <small>
                <table>
                    <tr>
                        <td class="status-name">Server</td>
                        <td>:</td>
                        <td class="status-value">{{ peer.open && !peer.disconnected? 'connected': 'disconnected' }}</td>
                    </tr>
                    <tr>
                        <td class="status-name">User</td>
                        <td>:</td>
                        <td class="status-value">{{ !peer.destroyed? 'active': 'expired' }}</td>
                    </tr>
                    <tr>
                        <td class="status-name">Remote</td>
                        <td>:</td>
                        <td class="status-value">{{ !!conn? 'connected': 'disconnected' }}</td>
                    </tr>
                </table>
                </small>
            </div>

            <br>

            <div class="tab">
                <button id="btn-home" class="tab-links active" v-on:click="openTab('home')">Home</button>
                <button id="btn-chat" class="tab-links" v-on:click="openTab('chat')">Chat</button>
                <button id="btn-video" class="tab-links" v-on:click="openTab('video')">Video</button>
            </div>
        </div>

        <div id="home" class="tab-content" style="display: block">
            <div class="item">
                <h1> Mimosa </h1>
                <small>Quiet and simple communication</small>
            </div>
            <div class="item">
                <div>Your invite link</div>
                <div v-on:click="copyLink">
                    <input id="url-field" type="text" v-model="inviteLink" readonly>
                </div>
            </div>
            <div class="item">
                <div>Your ID</div>
                <div v-on:click="copyID">
                    <input id="id-field" type="text" v-model="peer.id" readonly>
                </div>
            </div>
            <div class="item">
                <div>Your username</div>
                <div>
                    <input type="text" v-model="username">
                </div>
            </div>
            <div class="item">
                <div>Remote ID</div>
                <div>
                    <input type="text" v-model="remoteID">
                </div>
            </div>
            <div class="item">
                <div>
                    <button v-if="!conn" v-on:click="connectRemote" :disabled="!remoteID || !peer.open || peer.disconnected">CONNECT</button>
                    <button v-if="!!conn" v-on:click="disconnectRemote">DISCONNECT</button>
                </div>
            </div>
            <div class="item" v-on:click="openInstruction">
                <div>How to use?</div>
            </div>
        </div>

        <div id="chat" class="tab-content">
            <div class="chat-box">
                <div v-bind:key="m.timestamp" v-for="(m, i) in messageLog">
                    <div v-if="m.id == peer.id">
                        <div class="chat-own">
                            <div class="chat-header" v-if="!messageLog[i - 1] || messageLog[i - 1].id != m.id">
                                <small><i>{{ !!username? username: 'yourself' }}:</i></small>
                            </div>
                            <div>
                                > {{ m.message.trim() }}
                            </div>
                            <div class="chat-footer" v-if="!messageLog[i + 1] || messageLog[i + 1].id != m.id">
                            </div>
                        </div>
                    </div>
                    <div v-if="m.id != peer.id">
                        <div class="chat-foreign">
                            <div class="chat-header" v-if="!messageLog[i - 1] || messageLog[i - 1].id != m.id">
                                <small><i>{{ !!remoteUsername? remoteUsername: 'stranger' }}:</i></small>
                            </div>
                            <div>
                                > {{ m.message.trim() }}
                            </div>
                            <div class="chat-footer" v-if="!messageLog[i + 1] || messageLog[i + 1].id != m.id">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-type">
                <textarea id="type-message" v-model="message" :disabled="!conn" placeholder="Type message here and hit Enter"></textarea>
                <button style="display:none" id="send-message" v-on:click="sendData" :disabled="!message || !conn">Send</button>
            </div>
        </div>

        <div id="video" class="tab-content">
            <div class="item">
                <video id="remote-video" width="320" height="240"></video>
            </div>
            <div class="item">
                <button v-if="!call" v-on:click="startCall" :disabled="!conn">
                    <span class="material-icons">
                        call
                    </span>
                </button>
                <button v-if="!!call" v-on:click="endCall">
                    <span class="material-icons">
                        call_end
                    </span>
                </button>
            </div>
            <div class="item">
                <button v-if="!!call" v-on:click="openCallFullScreen">
                    <span class="material-icons">
                        fullscreen
                    </span>
                </button>
            </div>
        </div>
        
        <div id="instruction-modal" class="modal">
            <div class="modal-content">
                <span id="modal-btn-close" class="close" v-on:click="closeInstruction">&times;</span>
                
                <p>
                    <strong>If you are the initiator:</strong><br>
                    >Copy the invite link or the user ID and share it to one partner<br>
                    >Wait for your request to be accepted<br>
                    >Try not to refresh the page as it will issue you a new session ID and the old one will be destroyed
                </p>

                <p>
                    <strong>If you receive invite link:</strong><br>
                    >Paste the link to the browser<br>
                    >Click connect to accept the request
                </p>

                <p>
                    <strong>If you receive remote ID:</strong><br>
                    >Open app.nanas/mimosa and paste the link into REMOTE ID field<br>
                    >Click connectto accept request
                </p>

                <p>
                    <strong>Note:</strong><br>
                    >Consent is important<br>
                    >This chat is currently limited to one to one chat
                </p>

                <p>
                    <small><strong>Others:</strong></small><br>
                    <small>><a href="mailto:elys.1993a@gmail.com">Send me a mail!</a></small><br>
                    <small>><a href="github.com/CaptFurball/mimosa">Project Mimosa</a></small>
                </p>

                <p><small>This project was made with PeerJS WebRTC</small></p>
            </div>
        </div>

        <notify ref="n"></notify>
    </div>
</template>

<script>
import Notify from '../components/Notify'
import Peer from 'peerjs'

export default {
    name: 'Home',
    components: {
        'notify': Notify,
    },
    data () {
        return {
            remoteID: null,
            remoteUsername: '',
            peer: null,
            username: null,
            conn: null,
            call: null,
            message: null,
            messageLog: [],
            inviteLink: '',
            streams: []
        }
    },
    mounted () {
        var input = document.getElementById("type-message");

        input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("send-message").click();
            }
        });
    },
    created () {
        let peerServerConfig = {
            host: process.env.VUE_APP_PEER_SERVER_HOST, 
            path: process.env.VUE_APP_PEER_SERVER_PATH,
            debug: 3 
        }

        if (process.env.NODE_ENV === 'development') {
            peerServerConfig['port'] = process.env.VUE_APP_PEER_SERVER_PORT
        }

        this.peer = new Peer(peerServerConfig)
        this.peer.on('open', this.serverOpen)
            .on('close',        this.serverClose)
            .on('disconnected', this.serverDisconnected)
            .on('error',        this.peerError)
            .on('connection',   this.remoteOpen)
            .on('call',         this.remoteCall)

        if (this.$route.query.remote) {
            this.remoteID = this.$route.query.remote
        }
    },
    methods: {
        openInstruction () {
            document.getElementById("instruction-modal").style.display = "block"
        },
        closeInstruction () {
            document.getElementById("instruction-modal").style.display = "none"
        },
        copyLink () {
            let el = document.getElementById('url-field')
            el.select()
            document.execCommand('copy')
            this.$refs.n.show('link copied')
        },
        copyID () {
            let el = document.getElementById('id-field')
            el.select()
            document.execCommand('copy')
            this.$refs.n.show('id copied')
        },
        serverOpen () {
            this.inviteLink = process.env.VUE_APP_DOMAIN_URL + `main?remote=${this.peer.id}`
            this.$refs.n.show('You are connected to the server')
        },
        serverClose () {
            this.$refs.n.show('Your ID has expired, please refresh to get new ID')
        },
        serverDisconnected () {
            this.$refs.n.show('You are disconnected from the server')
        },
        connectRemote () {
            if (this.remoteID == this.peer.id) {
                this.$refs.n.show('This will not work, you are not THAT lonely')
            } else {
                this.conn = this.peer.connect(this.remoteID)
                this.conn.on('open', this.remoteReady)
                    .on('close', this.remoteClose)
                    .on('error', this.peerError)
                    .on('data', this.receiveData)
            }
        }, 
        remoteOpen (conn) {
            if (this.conn != null) {
                conn.close()
                this.$refs.n.show('Remote is busy')
            } else {
                this.conn = conn
                this.remoteID = this.conn.peer
                this.conn.on('open', this.remoteReady)
                    .on('close', this.remoteClose)
                    .on('error', this.peerError)
                    .on('data', this.receiveData)
            }
        },
        remoteReady () {
            this.$router.replace({ query: {} })
            this.openTab('chat')
            this.$refs.n.show('Remote connection established')
        },
        remoteClose () {
            this.conn.close()
            this.conn = null
            this.endCall()
            this.remoteID = null
            this.$refs.n.show('Remote has been disconnected')
            this.messageLog = []
            this.openTab('home')
        },
        disconnectRemote () {
            this.conn.close()
            this.conn = null
            this.endCall()
            this.messageLog = []
        },
        sendData () {
            if (this.message.trim() != '') {
                let messageObj = {
                    type: 'message',
                    message: this.message.trim(),
                    username: this.username,
                    id: this.peer.id,
                    timestamp: Date.now()
                }

                this.messageLog.push(messageObj)
                this.conn.send(messageObj)

                window.scroll(0, 99999999)

                this.message = ''
            }
        },
        receiveData (data) {
            if(data.type == 'message') {
                this.openTab('chat')
                this.messageLog.push(data)
                this.remoteUsername = data.username
                window.scroll(0, 99999999)

                if (!("Notification" in window)) {
                    this.$refs.n.show('This browser does not support desktop notification')
                } else if (Notification.permission === 'granted') {
                    navigator.serviceWorker.ready.then(function(registration) {
                        registration.showNotification(`${ data.message }`);
                    });
                } else if (Notification.permission !== 'denied') {
                    Notification.requestPermission().then(function (permission) {
                        if (permission === "granted") {
                            navigator.serviceWorker.ready.then(function(registration) {
                                registration.showNotification(`${ data.message }`);
                            });
                        }
                    });
                }
            }
        },
        remoteCall (call) {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            this.call = call
            this.openTab('video')
            let self = this
            getUserMedia({video: true, audio: true}, function(stream) {
                stream.getTracks().forEach(function (streamTrack) {
                    self.streams.push(streamTrack)
                })

                if (confirm("answer call?")) {
                    self.openTab('video')
                    self.call.answer(stream)
                    self.call.on('stream', self.streamToCanvas)
                        .on('close', self.endCall)
                        .on('error', (e) => { console.log(e) })
                }
                
            }, function(err) {
                console.log('Failed to get local stream' ,err);
            });
        },
        startCall () {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            let self = this
            getUserMedia({video: true, audio: true}, function(stream) {
                stream.getTracks().forEach(function (streamTrack) {
                    self.streams.push(streamTrack)
                })

                self.call = self.peer.call(self.conn.peer, stream)
                self.call.on('stream', self.streamToCanvas)
                    .on('close', self.endCall)
                    .on('error', (e) => { console.log(e) })
            }, function(err) {
                console.log(err)
                this.$refs.n.show('The video call has failed')
            });
        },
        streamToCanvas (remoteStream) {
            let video = document.getElementById('remote-video');
            video.srcObject = remoteStream
            video.play();
        },
        endCall () {
            this.streams.forEach(function (stream) {
                stream.stop()
            })

            this.call.close()
            this.call = null
        },
        peerError (err) {
            console.log(err)
            
            switch(err.type) {
            case 'browser-incompatible':
                this.$refs.n.show('Your browser is incompatible')
                break;
            case 'disconnected':
            case 'unavailable-id':
                this.$refs.n.show('Your ID has expired, please refresh to get new ID')
                break;
            case 'network':
            case 'server-error':
                this.$refs.n.show('Lost or cannot establish a connection to the signalling server')
                break;
            case 'peer-unavailable':
                this.$refs.n.show('The remote does not exists')
                break;
            case 'socket-error':
                this.$refs.n.show('An error from the underlying socket')
                break;
            case 'socket-closed':
                this.$refs.n.show('The underlying socket has closed unexpectedly')
                break;
            case 'webrtc':
                this.$refs.n.show('Native WebRTC error')
                break;
            default:
                this.$refs.n.show('An error has occured, please contact us at elys.1993a@gmail.com for troubleshooting')
            }
        },
        openCallFullScreen () {
            var el = document.getElementById("remote-video");
            if (el.requestFullscreen) {
                el.requestFullscreen();
            } else if (el.mozRequestFullScreen) {
                el.mozRequestFullScreen();
            } else if (el.webkitRequestFullscreen) {
                el.webkitRequestFullscreen();
            } else if (el.msRequestFullscreen) {
                el.msRequestFullscreen();
            }
        },
        openTab (tabName) {
            let tabContent = document.getElementsByClassName("tab-content");
            for (let i = 0; i < tabContent.length; i++) {
                tabContent[i].style.display = "none";
            }

            let tabLinks = document.getElementsByClassName("tab-links");
            for (let i = 0; i < tabLinks.length; i++) {
                tabLinks[i].className = tabLinks[i].className.replace(" active", "");
            }

            document.getElementById(tabName).style.display = "block";
            document.getElementById(`btn-${tabName}`).className += " active";
        }
    }
}
</script>

<style scoped>

</style>