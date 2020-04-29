<template>
    <div class="chat">
        <div class="bar">
            <i class="call-icon material-icons md-48">voice_chat</i>
        </div>
        <div class="log">
            <div class="block white">
                <div class="header">yourself:</div>
                <div class="body">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div class="body">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div class="body">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div class="footer"></div>
            </div>
            <div class="block black">
                <div class="header">stranger:</div>
                <div class="body">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div class="footer"></div>
            </div>
        </div>
        <div class="box">
            <textarea placeholder="type here"></textarea>
        </div>
    </div>
</template>

<style scoped>
.log {
    margin-top: 50px;
    margin-bottom: 100px;
}

.log .block {
    padding-left: 15%;
    padding-right: 15%;
    text-align: justify;
}

.log .block.white {
    background: white;
    color: black;
}

.log .block.black {
    background: black;
    color: white;
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
    background: white;
}

.box textarea {
    font-family: 'Roboto Mono', sans-serif;
    text-align: center;
    font-size: 16px;
    background: none;
    outline: 0;
    border-width: 0 0 1px;
    border-color: black;
    color: black;
    padding: 10px;
    width: 90%;
}
</style>