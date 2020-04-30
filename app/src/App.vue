<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

html, body {
    background: white;
    color: black;
    font-family: 'Roboto Mono', sans-serif;
    padding: 0;
    margin: 0;
}

#app {
    font-family: 'Roboto Mono', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

input {
    font-family: 'Roboto Mono', sans-serif;
    text-align: center;
    background: none;
    outline: 0;
    border-width: 0 0 1px;
    border-color: black;
    color: black;
    padding: 10px;
    font-size: 16px;
    width: 50%;
}

button {
    font-family: 'Roboto Mono', sans-serif;
    text-align: center;
    background: none;
    outline: 0;
    border: 1px solid black;
    color: black;
    padding: 10px;
    font-size: 16px;
}

button:click {
    border: 1px solid black;
    background-color: black;
    color: black;
}

button:active {
    background-color: black;
    color: black;
}

button.active {
    background-color:black;
    color: black;
}

button:focus{
    background: orange;
}

button:disabled,
button[disabled]{
    border: 1px solid #999999;
    background-color: #cccccc;
}

i.material-icons.md-16 {
    font-size: 16px;
}

i.material-icons.md-48 {
    font-size: 48px;
}

.item {
    margin: 25px 0;
}

.bar {
    background: white;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 95%;
    height: 50px;
    color: black;
    padding: 10px;
}
</style>
