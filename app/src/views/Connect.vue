<template>
    <div class="connect">
        <div class="title">
            <div class="item">
                <h1>MIMOSA</h1>
                <div>Quiet and simple messaging</div>
            </div>
        </div>
        <div class="body">
            <div class="item">
                <div><label>Local ID</label></div>
                <div>
                    <input id="local-id-field" 
                        type="text" 
                        v-model="$parent.peer.id" 
                        v-on:click="copy" 
                        readonly>
                </div>
            </div>
            <div class="item">
                <div><label>Remote ID</label></div>
                <input type="text" v-model="$parent.remoteID">
            </div>
            <div class="item" v-if="$parent.peer && !$parent.peer.disconnected">
                <button v-if="!$parent.dataConn || !$parent.dataConn.open" v-on:click="connectPeer" :disabled="!$parent.remoteID || $parent.dataConn && !$parent.dataConn.open">
                    {{ $parent.dataConn && !$parent.dataConn.open? 'Connecting': 'Connect' }}
                </button>
                <button v-if="$parent.dataConn && $parent.dataConn.open" v-on:click="$parent.dataConn.close()">Disconnect</button>
            </div>
            <div class="item" v-if="!$parent.peer || $parent.peer.disconnected">
                <button v-on:click="$parent.peer.reconnect()">Reconnect</button>
            </div>
            <div class="item">
                <a><u><i>How to use?</i></u></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        copy () {
            let element = document.getElementById('local-id-field')
            element.select()
            document.execCommand('copy')
        },
        connectPeer () {
            this.$parent.peerConnect(this.$parent.remoteID)
        }
    }
}
</script>

<style scoped>
.title {
    padding: 50px;
    height: 30%;
}

.body {
    padding: 25px;
    height: 70%;
}
</style>