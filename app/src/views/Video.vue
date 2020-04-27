<template>
    <div class="section">
        <div class="item">
                <video id="remote-video" width="320" height="240"></video>
        </div>
        
        <div class="item">
            <button 
                v-if="!$parent.mediaConnection" 
                v-on:click="start" 
                :disabled="!$parent.dataConnection">
                Call
            </button>
            <button class="blink"
                v-if="!!$parent.mediaConnection && !$parent.mediaConnection.open && $parent.mediaConnectionRole == 'receiver'" 
                v-on:click="answer">
                Answer
            </button>
            <button 
                v-if="!!$parent.mediaConnection && !!$parent.mediaConnection.open" 
                v-on:click="fullscreen">
                Fullscreen
            </button>
            <button 
                v-if="!!$parent.mediaConnection" 
                v-on:click="end">
                End
            </button>
        </div>
        <div class="item">
            <div>
                <h3 v-if="!!$parent.mediaConnection && !$parent.mediaConnection.open">
                    {{ $parent.mediaConnectionRole == 'receiver'? 'incoming call': 'calling' }} 
                </h3>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    mounted () {
        let video = document.getElementById('remote-video');
        video.srcObject = this.$parent.remoteStream
        video.play();
    },
    methods: {
        start () {
            let self = this
            let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            
            getUserMedia({video: true, audio: true}, function(stream) {
                stream.getTracks().forEach(function (streamTrack) {
                    self.$parent.mediaStreamTracks.push(streamTrack)
                })

                self.$parent.mediaConnection = self.$parent.peer.call(self.$parent.dataConnection.peer, stream)
                self.$parent.mediaConnectionRole = 'initiator'
                self.$parent.mediaConnection.on('stream', self.stream)
                    .on('close', self.end)
                    .on('error', (err) => { console.log(err) })
            }, function(err) {
                console.log(err)
                this.$parent.$refs.n.show('Fail to get recording device')
            });
        },
        answer () {
            let self = this
            let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            getUserMedia({video: true, audio: true}, function(stream) {
                stream.getTracks().forEach(function (streamTrack) {
                    self.$parent.mediaStreamTracks.push(streamTrack)
                })

                self.$parent.mediaConnection.answer(stream)
                self.$parent.mediaConnection.on('stream', self.stream)
                    .on('close', self.$parent.nukeMediaConnection)
                    .on('error', (e) => { console.log(e) })
            }, function(err) {
                console.log(err)
                self.$parent.$refs.n.show('Fail to get recording device')
            });
        },
        end () {
            this.$parent.nukeMediaConnection()
        },
        fullscreen () {
            var element = document.getElementById("remote-video");
            
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        },
        stream (remoteStream) {
            this.$parent.remoteStream = remoteStream
            let video = document.getElementById('remote-video');
            video.srcObject = remoteStream
            video.play();
        }
    }
}
</script>

<style scoped>
video {
    border: 1px solid black;
}
</style>