<template>
        <div class="chat">
            <div class="log">
                <div>
                    <button>clear chat log</button>
                </div>
                <div class="item">
                    <i>message log here</i>
                </div>
            </div>
        </div>
</template>

<style scoped>
.chat {
    margin: 15px 0;
    overflow: hidden;
    box-sizing: border-box;
    border: 2px solid black;
}

.chat .log {
    position: relative;
    overflow: auto;
    max-height: 75vh;
}

.item {
    height: 1000px;
}
</style>