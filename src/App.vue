<script setup>
import Welcome from './components/welcome.vue';
import Assembler from './components/assembler.vue';
import Simulator from './components/simulator.vue';
import Helppanel from './components/helppanel.vue';

</script>

<template>
  <header>
  </header>
  <main>
    <Welcome @help="sidebar = true;"></Welcome>
    <div class="grid">
      <div class="col-3">
        <Assembler @updatebin="doBin($event)" :linenumber="addr" :example="exampleFile"></Assembler>
      </div>
      <div class="col-9">
        <Simulator :bin="bin" @update-addr="doAddr($event)"></Simulator>
      </div>
    </div>
    <Sidebar class="p-sidebar-md" v-model:visible="sidebar" :baseZIndex="10000" position="right" :dismissable="true"
      :showCloseIcon="false">
      <template #header>
        <h2>Help Command Bin File Format
          <Button class="p-button-sm p-button-rounded" icon="pi pi-times" @click="sidebar = false;"></Button>
        </h2>
      </template>
      <Helppanel />
    </Sidebar>
  </main>
</template>

<script>
export default {
  name: "Virtual-TPS",
  data() {
    return {
      displayBasic: false,
      addr: 0,
      bin: [],
      sidebar: false,
      exampleFile: "",
    }
  },
  mounted() {
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    this.exampleFile = params.get("example")
  },
  methods: {
    doBin(bin) {
      this.bin = bin;
    },
    doAddr(addr) {
      this.addr = addr;
    }
  }
}
</script>

<style>
@import './assets/base.css';

#app {
  margin: 0 auto;
  padding: 1rem;

  font-weight: normal;
}
</style>
