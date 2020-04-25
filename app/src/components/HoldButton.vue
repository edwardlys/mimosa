<template>
    <button></button>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>
button {
	display: inline-block;
  margin: 0;
  background: white;
  padding: 0.75rem 1rem;
  border: 2px solid black;
	font-size: 1rem;
  font-family: 'Roboto Mono', sans-serif;
	cursor: pointer;
	-webkit-appearance: none;
	-webkit-font-smoothing: antialiased;
}

button:hover {
  border: 2px solid black;
  background-color: blue;
  color: white;
}

button:click {
  border: 2px solid black;
  background-color: black;
  color: white;
}

/* button:active {
  border: 2px solid black;
  background-color: black;
  color: white;
} */

button:focus{
  border: 2px solid black;
  background-color: black;
  color: white;
  outline:none;
}

button:disabled,
button[disabled]{
  border: 2px solid #999999;
  background-color: #cccccc;
}

</style>