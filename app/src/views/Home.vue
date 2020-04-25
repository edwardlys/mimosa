<template>
    <div class="container">
        <div class="item">
            <h1> Mimosa </h1>
        </div>
        <div class="item">
            <span>Quiet, simple, fast communication</span>
        </div>
        <div class="item">
            <div>Your ID</div>
            <div v-on:click="copyID">
                <input id="id-field" type="text" v-model="id" readonly>
            </div>
        </div>
        <div class="item">
            <div>Remote ID</div>
            <div>
                <input id="remote-id-field" type="text" v-model="remoteID">
            </div>
        </div>
        <div class="item">
            <div>
                <hold-button>test</hold-button>
                <button>test</button>
            </div>
        </div>
        <notify ref="n"></notify>
    </div>
</template>

<script>
import Notify from '../components/Notify'
import HoldButton from '../components/HoldButton'

export default {
    name: 'Home',
    components: {
        'notify': Notify,
        'hold-button': HoldButton
    },
    data () {
        return {
            id: null,
            remoteID: null
        }
    },
    created () {
        window.peer.on('open', (id) => {
            this.id = id
        })
    },
    methods: {
        copyID () {
            let el = document.getElementById('id-field')
            el.select()
            document.execCommand('copy')
            this.$refs.n.show('ID copied')
        }
    }
}
</script>

<style scoped>
.item {
    padding-top: 5%;
    padding-bottom: 5%;
}
</style>