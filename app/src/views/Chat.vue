<template>
    <div class="chat">
        <div class="bar">
            <i class="call-icon material-icons md-48">voice_chat</i>
        </div>
        <div class="log">
            <div v-bind:key="index" v-for="(message, index) in $parent.messageLog">
                <div :class="isRemoteBlock(message.id)">
                    <div class="header" v-if="!hasPreviousBlock(index)">
                        {{ isRemote(message.id)? 'stranger': 'yourself' }} :
                    </div>
                    <div class="body">
                        {{ message.text }}
                    </div>
                    <div class="footer" v-if="!hasNextBlock(index)"></div>
                </div>
            </div>
        </div>
        <div class="box">
            <textarea id="message-field" v-model="message" placeholder="type here"></textarea>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            messageLog: this.$parent.messageLog,
            message: ''
        }
    },
    watch: {
        messageLog: function () {
            console.log('test')
            this.scrollToBottom()
        }
    },
    mounted () {
        let element = document.getElementById("message-field");
        element.addEventListener("keyup", this.pressEnter);

        this.scrollToBottom()
    },
    methods: {
        pressEnter (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                this.sendMessage()
            }
        },
        isRemoteBlock (id) {
            return this.isRemote(id)? 'block remote': 'block lcoal'
        },
        isRemote (id) {
            return this.$parent.peer.id != id? true: false
        },
        hasPreviousBlock(index) {
            return this.$parent.messageLog[index - 1] && this.$parent.messageLog[index - 1].id == this.$parent.messageLog[index].id? true: false
        },
        hasNextBlock(index) {
            return this.$parent.messageLog[index + 1] && this.$parent.messageLog[index + 1].id == this.$parent.messageLog[index].id? true: false
        },
        sendMessage () {
            if (this.$parent.dataConn && this.$parent.open && this.message.trim() != '') {
                let payload = {
                    type: 'message',
                    text: this.message.trim(),
                    id:   this.$parent.peer.id,
                    timestamp: Date.now()
                }

                this.$parent.messageLog.push(payload)
                this.$parent.dataConn.send(payload)
            } else {
                // notification
            }

            this.message = ''
        },
        scrollToBottom () {
            this.$nextTick(() => {
                window.scrollBy(0, document.querySelector('.log').offsetHeight)
            })
        }
    }
}
</script>

<style scoped>
.log {
    margin-top: 70px;
    margin-bottom: 100px;
}

.log .block {
    padding-left: 15%;
    padding-right: 15%;
    text-align: justify;
}

.log .block .header {
    padding-top: 15px;
    padding-bottom: 10px;
    font-style: italic;
    text-align: center;
}

.log .block .body {
    padding-top: 10px;
    padding-bottom: 10px;
    overflow-wrap: break-word;
}

.log .block .footer {
    padding-bottom: 15px;
}

.box {
    position: fixed;
    bottom: 0;
    padding-bottom: 10px;
    padding-top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    background: black;
}

.box textarea {
    font-family: 'Roboto Mono', sans-serif;
    text-align: center;
    font-size: 16px;
    background: none;
    outline: 0;
    border-width: 0 0 1px;
    border-color: white;
    color: white;
    padding: 10px;
    width: 90%;
}
</style>