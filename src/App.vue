<template>
  <div id="app">
    <nav-bar/>

    <Spinner/>

    <div class=" md:px-16 xl:px-0">
      <router-view/>
    </div>
    <footer-bar/>

  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Spinner from '@/components/Spinner'
import FooterBar from '@/components/FooterBar'
import mixin from "./mixin/mixin";



export default {
  components: {
    NavBar, FooterBar, Spinner
  },
  data() {
    return {
      refreshTokenInterval: null
    }
  },
  methods: {},
  async created(){
    const aChain = ["rinkeby"];
    let connect_status;
    const user = JSON.parse(localStorage.getItem('userdata'))
    if(window.ethereum.selectedAddress === null){
      localStorage.removeItem('userdata');
      connect_status = await im.connect(aChain, ethereumNode, '0x0000000000000000000000000000000000000000');
    }
    else if(!user){
      connect_status = await im.connect(aChain, ethereumNode, '0x0000000000000000000000000000000000000000');
    }
    else{
      connect_status = await im.connect(aChain);
    }
  },

  mixins: [ mixin ]
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

#app {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}

html, body {
  font-family: 'Roboto', sans-serif;
}

</style>
