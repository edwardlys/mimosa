<template>
    <div id="notify">
        {{ message }}
    </div>
</template>

<script>
export default {
    data () {
        return {
            message: ''
        }
    },
    methods: {
        show (text) {
            var el = document.getElementById("notify")
            el.className = "show"
            this.message = text
            setTimeout(
                () => { 
                    el.className = el.className.replace("show", "") 
                    this.message = ''
                }, 3000)
        }
    }
}
</script>

<style scoped>
#notify {
    visibility: hidden;
    width: 80%;
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 10px;
    position: fixed;
    z-index: 1;
    transform: translateX(-50%);
    left: 50%;
    bottom: 30px;
}

#notify.show {
  visibility: visible; 
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}
</style>