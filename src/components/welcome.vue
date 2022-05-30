<template>
    <Panel class="welcome-panel-header-custom" header="Virtual TPS" :toggleable="true" v-model:collapsed="isCollapsed">  
        Hallo, willkommen bei Virtual-TPS, dem TPS-Editor und Simulator für Ihren Browser.<br/>
        Hier können Sie ihre TPS Programme in TPS Assembler schreiben und auch gleich mit dem Emulator testen.
    </Panel>
</template>

<script>
export default {
     data() {
        return {
            isCollapsed: false
        }
    },
    mounted() {
        setTimeout(this.collapse, 10000);
    },
    methods: {
        collapse() {
            this.isCollapsed = true;
        }
    }
}
</script>

<style>
.welcome-panel-header-custom .p-panel-header {
  font-size: 20px;
}
</style>