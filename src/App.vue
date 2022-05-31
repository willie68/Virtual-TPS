<script setup>
//import HelloWorld from './components/HelloWorld.vue'
import Dialog from 'primevue/dialog/sfc';
import Button from 'primevue/button/sfc';
import Welcome from './components/welcome.vue';
import Assembler from './components/assembler.vue';
import Simulator from './components/simulator.vue';

</script>

<template>
  <header>
  </header>

  <main>
    <Welcome></Welcome>
    
    <div class="grid">
      <div class="col-4">
        <Assembler @updatebin="doBin($event)"></Assembler>
      </div>
      <div class="col-8">
        <Simulator :bin="bin"></Simulator>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: "Virtual-TPS",
    data() {
      return {
        displayBasic: false,
        bin: []
      }
    },
    methods: {
      doBin(bin) {
        this.bin = bin;
      }
    }
}
</script>

<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;

  font-weight: normal;
}

</style>
