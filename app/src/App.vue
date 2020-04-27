<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

html, body {
    font-family: 'Roboto Mono', sans-serif;
}

#app {
    font-family: 'Roboto Mono', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: black;
}

.material-icons.md-12 { 
    font-size: 12px; 
}

.material-icons.md-12.green {
    color: #0dff25
}

.material-icons.md-12.red {
    color: red
}

.status {
    background: white;
}

.status-value {
    text-align: left;
}

.status-name {
    text-align: left;
}

.header {
    position: fixed;
    top: 0;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: none;
}

.footer {
    position: fixed;
    bottom: 0;
    margin-bottom: 10px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: white;
}

.navbar .navbar-btn {
    width: 30%;
}

.section {
    margin-top: 20px;
    margin-bottom: 75px;
}

input {
    margin: 5px;
    border: 0;
    outline: 0;
    background: transparent;
    font-family: 'Roboto Mono', sans-serif;
    font-size: 1rem;
    border-bottom: 1px solid black;
}

textarea {  
    margin: 5px;
    border: 0;
    outline: 0;
    background: transparent;
    font-family: 'Roboto Mono', sans-serif;
    font-size: 1rem;
    border-bottom: 1px solid black;
    resize: none;
}

.item {
    padding-top: 15px;
    padding-bottom: 15px;
}

button {
	display: inline-block;
    background: none;
    padding: 0.5rem 0.75rem;
    border: 1px solid black;
	font-size: 1rem;
    font-family: 'Roboto Mono', sans-serif;
	cursor: pointer;
}

button:click {
    border: 1px solid black;
    background-color: black;
    color: white;
}

button:active {
    border: 1px solid black;
    background-color: black;
    color: white;
}

button.active {
    border: 1px solid black;
    background-color:black;
    color: white;
}

button:focus{
    outline:none;
    background: orange;
}

button:disabled,
button[disabled]{
    border: 1px solid #999999;
    background-color: #cccccc;
}

i:disabled,
i[disabled] {
    color: #cccccc;
}

button.blink {
    animation: blink 1.2s infinite
}

@keyframes blink {
    0% { 
        background: black;
        color: white;    
    }
    49% {    
        background: black; 
        color: white;
    }
    60% {
        background: white; 
        color: black;
    }
    99% {
        background: white; 
        color: black;
    }
    100% { 
        background: black;
        color: white;    
    }
}
</style>
