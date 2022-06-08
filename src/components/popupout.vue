<template>
    <Dialog position="topleft" :visible="showDialog" :closable="false">
        <div class="grid">
            <div class="col">
                <ToggleButton :class="{ dout: dout4 }" id="Dout4" name="Dout4" v-model="dout4" onIcon="pi pi-circle"
                    offIcon="pi pi-circle" />
                <br />
                <label for="Dout4">Dout 4</label>
            </div>
            <div class="col">
                <ToggleButton :class="{ dout: dout3 }" id="Dout3" name="Dout3" v-model="dout3" onIcon="pi pi-circle"
                    offIcon="pi pi-circle" />
                <br />
                <label for="Dout3">Dout 3</label>
            </div>
            <div class="col">
                <ToggleButton :class="{ dout: dout2 }" id="Dout2" name="Dout2" v-model="dout2" onIcon="pi pi-circle"
                    offIcon="pi pi-circle" />
                <br />
                <label for="Dout2">Dout 2</label>
            </div>
            <div class="col">
                <ToggleButton :class="{ dout: dout1 }" id="Dout1" name="Dout1" v-model="dout1" onIcon="pi pi-circle"
                    offIcon="pi pi-circle" />
                <br />
                <label for="Dout1">Dout 1</label>
            </div>
        </div>
    </Dialog>
</template>

<script>
export default {
    props: {
        dout1: Boolean,
        dout2: Boolean,
        dout3: Boolean,
        dout4: Boolean,
        showDialog: Boolean,
    }
}
</script>

<style scoped>
.p-togglebutton.p-button {
    box-shadow: none;
    background-color: black;
    transition-property: none;
}

.p-togglebutton.p-button.p-highlight{
    box-shadow: none;
    background-color: white !important;
    transition-property: none;
}

.dout {
    box-shadow: none;
    background-color: white !important;
    transition-property: none;
}
</style>