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
    <Splitter style="height: 300px">
	    <SplitterPanel>
        <Assembler></Assembler>
	    </SplitterPanel>
	    <SplitterPanel>
		    <Simulator></Simulator>
	    </SplitterPanel>
    </Splitter>
    <Button label="Show" icon="pi pi-external-link" @click="openBasic"></Button>
    <Dialog header="Header" v-model:visible="displayBasic" >
	  Content
  </Dialog>
  </main>
</template>

<script>
  export default {
    name: "Virtual-TPS",
    data() {
      return {
        displayBasic: false,
      }
    },
    methods: {
      openBasic() {
        this.displayBasic = true;
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
