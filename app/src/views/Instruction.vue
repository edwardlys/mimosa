<template>
    <div>
        <div class="modal-content">
            <span id="modal-btn-close" class="close" v-on:click="closeInstruction">&times;</span>
            <p>
                <strong>If you are the initiator:</strong><br>
                >Copy the invite link or the user ID and share it to one partner<br>
                >Wait for your request to be accepted<br>
                >Try not to refresh the page as it will issue you a new session ID and the old one will be destroyed
            </p>
            <p>
                <strong>If you receive invite link:</strong><br>
                >Paste the link to the browser<br>
                >Click connect to accept the request
            </p>
            <p>
                <strong>If you receive remote ID:</strong><br>
                >Open app.nanas/mimosa and paste the link into REMOTE ID field<br>
                >Click connectto accept request
            </p>
            <p>
                <strong>Note:</strong><br>
                >Consent is important<br>
                >This chat is currently limited to one to one chat
            </p>
            <p>
                <small><strong>Others:</strong></small><br>
                <small>><a href="mailto:elys.1993a@gmail.com">Send me a mail!</a></small><br>
                <small>><a href="github.com/CaptFurball/mimosa">Project Mimosa</a></small>
            </p>
            <p><small>This project was made with PeerJS WebRTC</small></p>
        </div>
    </div>
</template>