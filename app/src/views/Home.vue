<template>
    <div class="container">
        <div class="header">
            <div class="status">
                <small>
                    |
                    <span>
                        Server 
                        <i v-if="peer.open && !peer.disconnected" class="material-icons md-12 green">brightness_1</i>
                        <i v-if="!peer.open || peer.disconnected" class="material-icons md-12 red">brightness_1</i>
                    </span>
                    |
                    <span>
                        Remote 
                        <i v-if="!!dataConnection && !!dataConnection.open" class="material-icons md-12 green">brightness_1</i>
                        <i v-if="!dataConnection || !dataConnection.open" class="material-icons md-12 red">brightness_1</i>
                    </span>
                    |
                    <span>
                        User ID 
                        <i v-if="!peer.destroyed" class="material-icons md-12 green">brightness_1</i>
                        <i v-if="peer.destroyed" class="material-icons md-12 red">brightness_1</i>
                    </span>
                    |
                </small>
            </div>

        </div>

        <router-view></router-view>

        <notify ref="n"></notify>

        <div class="footer">
            <div class="navbar">
                <button id="nav-text" class="navbar-btn" v-on:click="redirectNav('/home/text', 'nav-text')">Text</button>
                <button id="nav-main" class="navbar-btn" v-on:click="redirectNav('/home', 'nav-main')">Home</button>
                <button id="nav-video" class="navbar-btn" v-on:click="redirectNav('/home/video', 'nav-video')">Video</button>
            </div>
        </div>
    </div>
</template>

<script>
import Notify from '../components/Notify'
import Peer from 'peerjs'

export default {
    components: {
        'notify': Notify,
    },
    data () {
        return {
            inviteLink: '',
            remoteID: null,
            remoteUsername: null,
            username: null,
            peer: null,
            dataConnection: null,
            mediaConnection: null,
            mediaConnectionRole: null,
            mediaConnectionRemoteStream: null,
            messageLog: [],
            mediaStreamTracks: []
        }
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
            .on('close',        this.peerDestroyed)
            .on('disconnected', this.serverDisconnected)
            .on('error',        this.peerError)
            .on('connection',   this.newDataConnection)
            .on('call',         this.newMediaConnection)
    },
    methods: {
        redirectNav (route, disableBlinkID = null) {
            if (disableBlinkID) {
                let el = document.getElementById(disableBlinkID)
                el.classList.remove('blink')
            }

            if (this.$router.currentRoute.path != route) {
                this.$router.push(route)
            }
        },
        nukeAll () {
            this.nukedataConnection();
            this.nukeMediaConnection();
            this.$refs.n.show('Channel closed')
        },
        nukedataConnection () {
            if (this.messageLog.length != 0) {
                this.messageLog = []
            }

            if (this.dataConnection != null) {
                this.dataConnection.close()
                this.dataConnection = null
            }

            this.remoteID = null
            this.remoteUsername = null
        },
        nukeMediaConnection () {
            if (this.mediaStreamTracks.length != 0) {
                this.mediaStreamTracks.forEach(function (track) {
                    track.stop()
                })
            }

            if (this.mediaConnection != null) {
                this.mediaConnection.close()
                this.mediaConnection = null
            }

            this.mediaConnectionRole = null
            this.mediaConnectionRemoteStream = null
        },
        serverOpen () {
            this.inviteLink = `${process.env.VUE_APP_DOMAIN_URL}home?remote=${this.peer.id}`
            this.$refs.n.show('Connected to signal server')
        },
        peerDestroyed () {
            this.$refs.n.show('ID expired')
        },
        serverDisconnected () {
            this.$refs.n.show('Disconnected from signal server')
        },
        newDataConnection (dataConnection) {
            if (this.dataConnection != null) {
                dataConnection.close()
                this.$refs.n.show('Rejected an attempt to connect')
            } else {
                this.dataConnection = dataConnection
                this.remoteID = this.dataConnection.peer
                this.dataConnection.on('open', this.dataConnectionReady)
                    .on('close', this.dataConnectionClosed)
                    .on('error', this.peerError)
                    .on('data', this.dataConnectionReceive)
            }
        },
        dataConnectionReady () {
            this.$refs.n.show('Channel ready')
        },
        dataConnectionClosed () {
            this.nukeAll()
        },
        dataConnectionReceive (payload) {
            if(payload.type == 'message') {
                let el = document.getElementById('nav-text')
                el.classList.add('blink')
                this.remoteUsername = payload.username
                this.messageLog.push(payload)
                this.pushNotification('Mimosa: New Message', payload.message, [100, 100])
            } else {
                this.$refs.n.show('Unidentified payload received')
            }
        },
        newMediaConnection (mediaConnection) {
            if (this.$router.currentRoute.path != '/home/video') {
                let el = document.getElementById('nav-video')
                el.classList.add('blink')
            }

            this.mediaConnection = mediaConnection
            this.mediaConnectionRole = 'receiver'

            this.pushNotification('Mimosa: Incoming Call', 'There is a call waiting for you to accept', [100, 100, 500, 100, 100, 500, 100, 100, 500])
        },
        stream (remoteStream) {
            let video = document.getElementById('remote-video');
            video.srcObject = remoteStream
            video.play();
        },
        pushNotification (title, body, vibrate) {
            let options = {
                body: body,
                vibrate: vibrate
            }

            if (Notification.permission === 'granted') {
                navigator.serviceWorker.ready.then(function(registration) {
                    registration.showNotification(title, options);
                });
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(function (permission) {
                    if (permission === "granted") {
                        navigator.serviceWorker.ready.then(function(registration) {
                            registration.showNotification(title, options);
                        });
                    }
                });
            }
        },
        peerError (err) {
            this.nukeAll()
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
        }
    }
}
</script>