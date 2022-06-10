<template>
    <Panel class="welcome-panel-header-custom" header="Virtual TPS Beta" collapsed="true">
        <template #icons>
            <Button class="p-button-rounded  mx-1" icon="pi pi-question" v-tooltip.bottom="'context help'"
                @click="toggle"></Button>
            <Button class="p-button-rounded  mx-1" icon="pi pi-info" v-tooltip.bottom="'about'"
                @click="openModal()"></Button>
        </template>
    </Panel>
    <Dialog :header="header" v-model:visible="displayModal" :style="{ width: '50vw' }" :modal="true">
        <a href="http://rcarduino.de/doku.php?id=arduino:arduinosps" target="_blank">TPS</a><br />
        Hallo, willkommen bei Virtual-TPS, dem TPS-Editor und Simulator für Ihren Browser.<br />
        Die TPS ist eine von Burkhard Kainka entwickelter 4-Bit Interpreter, der auf verschiedenen Plattformen
        implementiert wurde.<br />
        <a href="https://www.elektronik-labor.de/Lernpakete/TPS/TPS0.html" target="_blank">Die Tastenprogrammierbare
            Steuerung</a><br />
        <br />
        Hier können Sie ihre TPS Programme in TPS Assembler oder auch direkt in TPS schreiben und mit einem Simulator
        testen.<br />
        Falls Sie Probleme fest gestellt haben, können Sie diese in github unter <a
            href="https://github.com/willie68/Virtual-TPS/issues" target="_blank">Virtual TPS issues</a> berichten.
        <template #footer>
            <Button label="Close" icon="pi pi-close" @click="closeModal" autofocus />
        </template>
    </Dialog>
</template>

<script>
export default {
    emits: ['help'],
    data() {
        return {
            isCollapsed: false,
            version: __APP_VERSION__,
            header: "",
            displayModal: true,
        }
    },
    mounted() {
        // this.displayModal = true
        this.header = "Virtual TPS Beta Version: " + this.version;
        this.openModal()
    },
    methods: {
        collapse() {
            this.isCollapsed = true;
        },
        toggle(event) {
            //this.$refs.op.toggle(event);
            this.$emit("help");
        },
        openModal() {
            this.displayModal = true;
            setTimeout(this.closeModal, 10000)
        },
        closeModal() {
            this.displayModal = false;
        },
    }
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

.welcome-panel-header-custom .p-panel-title {
    font-size: 30px;
}
</style>