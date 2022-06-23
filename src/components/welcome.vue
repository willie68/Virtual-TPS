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
        <p v-html="$t('message.welcome')"></p>
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
            displayModal: false,
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
            if (!this.islocal) {
                this.displayModal = true;
                setTimeout(this.closeModal, 10000)
            }
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