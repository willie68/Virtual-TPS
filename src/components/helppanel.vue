<template>
  <div v-if="mode === 'asm'">
  <Helpasm/>
  </div>
  <div v-if="mode === 'tps'">
  <Helptps/>
  </div>
</template>


<script>
import Helptps from './helptps.vue';
import Helpasm from './helpasm.vue';
export default {
    props: {
        mode: String,
    },
    components: { Helptps, Helpasm }
}
</script>

<style scoped>
a:link {
  color: lightblue;
  background-color: transparent;
  text-decoration: none;
}

a:visited {
  color: lightblue;
  background-color: transparent;
  text-decoration: none;
}

a:hover {
  color: white;
  background-color: transparent;
  text-decoration: underline;
}

a:active {
  color: yellow;
  background-color: transparent;
  text-decoration: underline;
}
</style>