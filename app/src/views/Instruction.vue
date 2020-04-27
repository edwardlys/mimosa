<template>
    <div class="section">
        <div class="instruction">
            <strong>If you are the initiator</strong><br>
            <ul>
                <li>Copy the invite link or the user ID and share it to one partner</li>
                <li>Wait for your request to be accepted</li>
                <li>Try not to refresh the page as it will issue you a new session ID and the old one will be destroyed</li>
            </ul>
            
            <strong>If you receive invite link</strong><br>
            <ul>
                <li>Paste the link to the browser</li>
                <li>Click connect to accept the request</li>
            </ul>
            
            <strong>If you receive remote ID</strong><br>
            <ul>
                <li>Open app.nanas/mimosa and paste the link into REMOTE ID field</li>
                <li>Click connect to accept request</li>
            </ul>

            <strong>Note</strong><br>
            <ul>
                <li>Consent is important</li>
                <li>'Nuke Session' => destroy user id and all connections, not recoverable</li>
                <li>'Nuke Server'  => not as bad as it sounds, just disconnect server</li>
                <li>When in doubt, nuke all</li>
            </ul>
            
            <br>
            <div>
                <button 
                    v-on:click="$parent.nukeAll">
                    Nuke Session
                </button>
                <button 
                    v-on:click="$parent.nukeServerConn">
                    Nuke Server
                </button>
            </div>
            <br>

            <strong>Others:</strong><br>
            <ul>
                <li><a href="mailto:elys.1993a@gmail.com">Send me a mail!</a></li>
                <li><a href="github.com/CaptFurball/mimosa">Project Mimosa</a></li>
            </ul>
            
            <p><small>This project was made with PeerJS WebRTC</small></p>
        </div>
    </div>
</template>

<style scoped>
.instruction {
    margin-top: 50px;
}

.instruction li {
    text-align: left;
}

</style>