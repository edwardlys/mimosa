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
            </div>
            <div class="item">
                <div>
                    <span>Quiet and simple communication</span>
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
        </div>

        <div id="chat" class="tab-content">
            <div class="chat-box">
                <div v-bind:key="m.timestamp" v-for="(m, i) in messageLog">
                    <div v-if="m.id == peer.id">
                        <div class="chat-own">
                            <div v-if="!messageLog[i - 1] || messageLog[i - 1].id != m.id">
                                <small><i>{{ !!username? username: 'yourself' }}:</i></small>
                            </div>
                            <div>
                                >{{ m.message.trim() }}
                            </div>
                        </div>
                    </div>
                    <div v-if="m.id != peer.id">
                        <div class="chat-foreign">
                            <div v-if="!messageLog[i - 1] || messageLog[i - 1].id != m.id">
                                <small><i>{{ !!remoteUsername? remoteUsername: 'stranger' }}:</i></small>
                            </div>
                            <div>
                                >{{ m.message.trim() }}
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
            coming soon
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
            message: null,
            messageLog: [],
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

        console.log(this.peer)
    },
    methods: {
        copyID () {
            let el = document.getElementById('id-field')
            el.select()
            document.execCommand('copy')
            this.$refs.n.show('ID copied')
        },
        serverOpen () {
            this.$refs.n.show('You are connected to the server')
        },
        serverClose () {
            this.$refs.n.show('Your ID has expired, please refresh to get new ID')
        },
        serverDisconnected () {
            this.$refs.n.show('You are disconnected from the server')
        },
        connectRemote () {
            this.remoteConnecting = true
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
            this.openTab('chat')
            this.$refs.n.show('Remote connection established')
        },
        remoteClose () {
            this.conn = null
            this.remoteID = null
            this.$refs.n.show('Remote has been disconnected')
            this.messageLog = []
            this.openTab('home')
        },
        disconnectRemote () {
            this.conn.close()
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

                this.message = ''
            }
        },
        receiveData (data) {
            if(data.type == 'message') {
                this.messageLog.push(data)
                this.remoteUsername = data.username
            }
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