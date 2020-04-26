<template>
    <div class="container">
        test page {{conn}}
        <notify ref="n"></notify>
    </div>
</template>

<script>
import Notify from '../components/Notify'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'Home',
    computed: {
        ...mapState([
            'peer',
            'conn',
        ])
    },
    components: {
        'notify': Notify,
    },
    data () {
        return {
            
        }
    },
    created () {
        console.log(this.peer)
    },
    methods: {
        ...mapActions ([
            'storePeer',
            'storeConn'
        ]),
    }
}
</script>

<style scoped>

</style>