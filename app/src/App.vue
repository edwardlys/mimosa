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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

input {
  border: 0;
  outline: 0;
  background: transparent;
  font-family: 'Roboto Mono', sans-serif;
  font-size: 1rem;
  border-bottom: 1px solid black;
}

textarea {  
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

.status-value {
    text-align: left;
}

.status-name {
    text-align: left;
}

button {
	display: inline-block;

  margin: 0;
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

.tab {
  overflow: hidden;
}

.tab-content {
  margin-top: 125px;
  display: none;
}

.material-icons.md-48 { font-size: 48px; }

.chat-box {
  margin: 10px;
  margin-bottom: 100px;
  border: 1px solid black;
}

.chat-type {
  background: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 50%;
  transform: translateX(-50%)
}

.chat-type textarea {
  width: 80%;
  height: 90%;
}

.chat-box .chat-own {
  background-color: white;
  color: black;
  /* text-align: right; */
  /* padding-left: 30%; */
  overflow-wrap: break-word;
}

.chat-box .chat-foreign {
  background-color: black;
  color: white;
  /* text-align: left; */
  /* padding-right: 30%; */
  overflow-wrap: break-word;
}

.navbar {
  position: fixed;
  top: 0;
  width: 95%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
