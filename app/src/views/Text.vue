<template>
    <div class="section">
        <div class="message-log">
            <div class="nothing-here-yet" v-if="$parent.messageLog.length == 0">
                <i>nothing here yet</i>
            </div>
            <div v-bind:key="m.timestamp" v-for="(m, i) in $parent.messageLog">
                <div v-if="m.userID == $parent.peer.id">
                    <div class="message-white">
                        <div class="message-header" v-if="!$parent.messageLog[i - 1] || $parent.messageLog[i - 1].userID != m.userID">
                            <small><i>{{ !!$parent.username? $parent.username: 'yourself' }}:</i></small>
                        </div>
                        <div>
                            > {{ m.message.trim() }}
                        </div>
                        <div class="message-footer" v-if="!$parent.messageLog[i + 1] || $parent.messageLog[i + 1].userID != m.userID">
                        </div>
                    </div>
                </div>
                <div v-if="m.userID != $parent.peer.id">
                    <div class="message-black">
                        <div class="message-header" v-if="!$parent.messageLog[i - 1] || $parent.messageLog[i - 1].userID != m.userID">
                            <small><i>{{ !!$parent.remoteUsername? $parent.remoteUsername: 'stranger' }}:</i></small>
                        </div>
                        <div>
                            > {{ m.message.trim() }}
                        </div>
                        <div class="message-footer" v-if="!$parent.messageLog[i + 1] || $parent.messageLog[i + 1].userID != m.userID">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="message-type-area">
            <textarea 
                id="message-field" 
                v-model="message" 
                :disabled="!$parent.dataConnection" 
                placeholder="Type message here and hit Enter">
            </textarea>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            message: '',
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
                this.send()
            }
        },
        send () {
            let textMsg = this.message.trim()
            
            if (textMsg != '') {
                let payload = this.buildPayload(textMsg)
                this.$parent.messageLog.push(payload)
                this.$parent.totalMessage = this.$parent.messageLog.length

                if (this.$parent.dataConnection.open) {
                    this.$parent.dataConnection.send(payload)
                }

                this.message = ''
                this.scrollToBottom()
            }            
        },
        buildPayload (textMsg) {
            return {
                type:      'message',
                message:   textMsg,
                username:  this.$parent.username,
                userID:    this.$parent.peer.id,
                timestamp: Date.now()
            }
        },
        scrollToBottom () {
            window.scrollBy(0, document.querySelector('.message-log').offsetHeight)
        }
    }
}
</script>

<style scoped>
.nothing-here-yet {
    text-align: center;
    margin: 10px;
    color: grey;
}

.message-log {
    margin-top: 75px;
    min-height: 75px;
    margin-bottom: 175px;
    border: 1px solid black;
    text-align: left;
}

.message-type-area {
    padding-bottom: 75px;
    background: white;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 50%;
    transform: translateX(-50%)
}

.message-type-area textarea {
  width: 90%;
  height: 90%;
}

.message-header {
  padding-top: 20px;
  padding-bottom: 15px;
  text-align: center;
}

.message-footer {
  padding-bottom: 15px;
}

.message-white {
  background-color: white;
  color: black;
  padding-right: 15%;
  padding-left: 15%;
  padding-bottom: 5px;
  overflow-wrap: break-word;
}

.message-black {
  background-color: black;
  color: white;
  padding-right: 15%;
  padding-left: 15%;
  padding-bottom: 5px;
  overflow-wrap: break-word;
}
</style>