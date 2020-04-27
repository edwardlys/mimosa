<template>
    <div class="section">
        <div class="item">
            <h1> Mimosa </h1>
            <small>Quiet and simple communication</small>
        </div>
        <div class="item">
            <div>Your invite link</div>
            <div v-on:click="copyInviteLink">
                <input 
                    id="invite-link-field" 
                    type="text" 
                    v-model="$parent.inviteLink" 
                    readonly>
            </div>
        </div>
        <div class="item">
            <div>Your ID</div>
            <div v-on:click="copyUserID">
                <input 
                    id="user-id-field" 
                    type="text" 
                    v-model="$parent.peer.id" 
                    readonly>
            </div>
        </div>
        <div class="item">
            <div>Your username</div>
            <div>
                <input type="text" v-model="$parent.username">
            </div>
        </div>
        <div class="item">
            <div>Remote ID</div>
            <div>
                <input type="text" v-model="$parent.remoteID">
            </div>
        </div>
        <div class="item">
            <button 
                v-if="!this.$parent.dataConnection" 
                v-on:click="connect" 
                :disabled="!$parent.remoteID || !this.$parent.peer.open || this.$parent.peer.disconnected">
                CONNECT
            </button>

            <button 
                v-if="!!this.$parent.dataConnection && !this.$parent.dataConnection.open" 
                disabled>
                CONNECTING..
            </button>

            <button 
                v-if="!!this.$parent.dataConnection && !!this.$parent.dataConnection.open" 
                v-on:click="disconnect">
                DISCONNECT
            </button>
        </div>
        <div class="item" >
            <button v-on:click="$parent.redirectNav('/home/instruction')">
                How to use?
            </button>
        </div>
    </div>
</template>

<script>
export default {
    mounted () {
        if (this.$route.query.remote) {
            this.$parent.remoteID = this.$route.query.remote
            this.$parent.$refs.n.show('invite link received, press connect to start')
        }
    },
    methods: {
        copyInviteLink () {
            let element = document.getElementById('invite-link-field')
            this.copy(element)
            this.$parent.$refs.n.show('link copied')
        },
        copyUserID () {
            let element = document.getElementById('user-id-field')
            this.copy(element)
            this.$parent.$refs.n.show('user id copied')
        },
        copy (inputElement) {
            inputElement.select()
            document.execCommand('copy')
        },
        connect () {
            if (this.$parent.remoteID == this.$parent.peer.id) {
                this.$parent.$refs.n.show('Could not connect to self')
            } else {
                this.$parent.dataConnection = this.$parent.peer.connect(this.$parent.remoteID)
                this.$parent.dataConnection.on('open', this.$parent.dataConnectionReady)
                    .on('close', this.$parent.dataConnectionClosed)
                    .on('error', this.$parent.peerError)
                    .on('data', this.$parent.dataConnectionReceive)
            }
        },
        disconnect () {
            this.$parent.nukeAll()
        }
    }
}
</script>
