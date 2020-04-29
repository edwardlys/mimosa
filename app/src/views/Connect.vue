<template>
    <div class="connect">
        <div class="title">
            <div class="item">
                <h1>MIMOSA</h1>
                <div>Quiet and simple messaging</div>
            </div>
        </div>
        <div class="body">
            <div class="item">
                <div><label for="user-id">User ID</label></div>
                <div>
                    <input type="text" name="user-id" readonly>
                </div>
            </div>
            <div class="item">
                <div><label for="user-id">Remote ID</label></div>
                <div><input type="text"></div>
            </div>
            <div class="item">
                <button>Connect</button>
                <button><i class="material-icons md-16">share</i></button>
            </div>
            <div class="item">
                <a><u><i>How to use?</i></u></a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.title {
    background: black;
    color: white;
    padding: 25px;
    height: 30%;
}

.body {
    background: white;
    color: black;
    padding: 25px;
    height: 70%;
}
</style>