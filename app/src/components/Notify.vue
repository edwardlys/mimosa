<template>
    <div id="notify">
        {{ message }}
    </div>
</template>

<script>
export default {
    data () {
        return {
            message: '',
            timeOut: null
        }
    },
    methods: {
        show (text) {
            let el = document.getElementById('notify')

            if (el.classList.contains('show')) {
                el.classList.remove('show')
            }

            if (this.timeOut) {
                clearTimeout(this.timeOut)
            }

            el.className = 'show'
            this.message = text
            this.timeOut = setTimeout(
                () => { 
                    el.className = el.classList.remove('show') 
                    this.message = ''
                }, 2000)
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
    top: 20px;
}

#notify.show {
  visibility: visible; 
  -webkit-animation: fadein 0.5s;
  animation: fadein 0.5s;
}

@-webkit-keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 20px; opacity: 1;}
}

@keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 20px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {top: 20px; opacity: 1;}
  to {top: 0; opacity: 0;}
}

@keyframes fadeout {
  from {top: 20px; opacity: 1;}
  to {top: 0; opacity: 0;}
}
</style>