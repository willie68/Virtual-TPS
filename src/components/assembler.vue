<template>
    <Toolbar>
        <template #start>
            <div class="toolbar-label">TPS Assembler</div>
        </template>
        <template #end>
            <Button class="p-button-rounded" icon="pi pi-arrow-right" v-tooltip.bottom="'to simulator'"
                @click="toSimu()"></Button>
        </template>

    </Toolbar>
    <TabView>
        <TabPanel header="TPS File">
            <Textarea v-model="source" rows="20" cols="36"></Textarea>
        </TabPanel>
        <TabPanel header="Bin File">
            <Textarea v-model="hex" rows="20" cols="36"></Textarea>
        </TabPanel>
    </TabView>
</template>

<script>
export default {
    emits: ['updatebin'],
    data() {
        return {
            source: "",
            hex: "",
            lines: [],
            bin: []
        }
    },
    methods: {
        toSimu() {
            console.log(this.source);
            let mysrc = this.source.split("\n");
            console.log(mysrc);
            mysrc.forEach(element => {
                if (!element.startsWith("#") && !(element ==="")) {
                    let cmdsParts = element.split(",");
                    let addr = Number(cmdsParts[0]);
                    let cmd = Number("0x" + cmdsParts[1]);
                    let data = Number("0x" + cmdsParts[2]);
                    console.log("addr:", addr, " cmd: ", cmd, " data: ", data);
                    this.bin[addr] = (cmd * 16 + data) & 0xff;
                }
            });
            console.log("event:", this.bin);
            this.$emit('updatebin', this.bin)
        }
    }
}
</script>

<style>
.toolbar-label {
    color: white;
}
</style>