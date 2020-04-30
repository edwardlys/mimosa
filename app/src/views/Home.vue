<template>
    <div class="home">
        <router-view>
        </router-view>
    </div>
</template>

<script>
import Peer from 'peerjs'

export default {
    data () {
       return {
           remoteID: '',
           peer: null,
           dataConn: null,
           mediaConn: null,
           messageLog: []
       }
    },
    created () {
        if (!this.peer && this.$router.currentRoute.path != '/') {
            this.$router.push('/')
        }

        let peerServerConfig = {
            host: process.env.VUE_APP_PEER_SERVER_HOST, 
            path: process.env.VUE_APP_PEER_SERVER_PATH,
            debug: 3 
        }

        if (process.env.NODE_ENV === 'development') {
            peerServerConfig['port'] = process.env.VUE_APP_PEER_SERVER_PORT
        }
        
        this.peer = new Peer(peerServerConfig)
        this.peer.on('open',    this.serverOpen)
            .on('disconnected', this.serverDisconnected)
            .on('connection',   this.peerDataConn)
            .on('call',         this.peerMediaConn)
            .on('close',        this.peerDestroyed)
            .on('error', this.peerError)
    },
    methods: {
        disconnectDataConn () {
            // notification
        },
        disconnectMediaConn () {
            // notification
        },
        serverOpen () {
            // notification
        },
        serverDisconnected () {
            // notification
        },
        peerDataConn (dataConn) {
            if (this.dataConn != null) {
                this.dataConn.close()
                this.$refs.n.show('Rejected an attempt to connect')
            } else {
                this.dataConn = dataConn
                this.remoteID = this.dataConn.peer
                this.dataConn
                    .on('open', () => {
                        // this.$router.push('/chat')
                    })
                    .on('close', this.dataConnClose)
                    .on('data', (payload) => {
                        if(payload.type == 'message') {
                            this.messageLog.push(payload)
                        }
                    })
            }
        },
        peerConnect () {
            this.peerDataConn(this.peer.connect(this.remoteID))
        },
        dataConnClose () {
            this.dataConn.close()
            this.dataConn = null
        },
        peerMediaConn (mediaConn) {
            this.dataConn = mediaConn
        },
        peerDestroyed () {

        },
        peerError (err) {
            
            switch(err.type) {
            case 'browser-incompatible':
                break;
            case 'disconnected':
            case 'unavailable-id':
                break;
            case 'network':
            case 'server-error':
                break;
            case 'peer-unavailable':
                break;
            case 'socket-error':
                break;
            case 'socket-closed':
                break;
            case 'webrtc':
                break;
            default:
            }

            this.dataConnClose()
        }
    }
}
</script>

<style scoped>
</style>