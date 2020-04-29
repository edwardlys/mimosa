<template>
    <div>
        <div class="bar">
            <i class="call-icon material-icons md-48">chat</i>
        </div>
        <div class="player">
            <video controls></video>
        </div>
        <div class="control">
            <div class="item">
                <button><i class="material-icons md-48">call</i></button>
                <button><i class="material-icons md-48">call_end</i></button>
                <button><i class="material-icons md-48">phonelink_ring</i></button>
            </div>
            <div class="item">
                <button><i class="material-icons md-48">fullscreen</i></button>
                <button><i class="material-icons md-48">volume_off</i></button>
                <button><i class="material-icons md-48">videocam_off</i></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.player {
    margin-top: 50px;
    background: grey;
}

video {
    height: 30%;
}

.control {
    background: black;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
}

.control button {
    width: 30%;
    color: white;
}
</style>