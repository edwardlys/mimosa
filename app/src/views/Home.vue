<template>
    <div>
        <div class="header">
            --- status line ---
        </div>
        <div class="body">
            <div id="connect-section" class="section show">
                <connect></connect>
            </div>

            <div id="text-section" class="section hide">
                <text-chat></text-chat>
            </div>

            <div id="video-section" class="section hide">
                <video-chat></video-chat>
            </div>
        </div>

        <div class="footer">
            <div id="text-panel" class="panel hide">
                <textarea></textarea>
            </div>
            <div id="video-panel" class="panel hide">
                --- video panel ---
            </div>
        </div>
    </div>
</template>

<script>
// import Peer from 'peerjs'
import Connect from '../components/Connect'
import TextChat from '../components/TextChat'
import VideoChat from '../components/VideoChat'

export default {
    components: {
        'connect': Connect,
        'text-chat': TextChat,
        'video-chat': VideoChat
    },
    data () {
       
    },
    created () {
        
    },
    methods: {

    }
}
</script>

<style scoped>
.header {
    margin: 15px 0;
}

.body {
    margin: 15px 0;
}

.body .section {
    position: absolute;
    top: 45px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    margin-bottom: 50px;
}

.body .section.show {
    z-index: 999;
}

.body .section.hide {
    z-index: 1;
}

.footer {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
}

.panel.show {
    display: block;
}

.panel.hide {
    display: none;
}
</style>