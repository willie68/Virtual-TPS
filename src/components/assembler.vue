<template>
    <Toolbar>
        <template #start>
            <div class="toolbar-label">TPS Assembler</div>
        </template>
        <template #end>
            <Dropdown v-model="selectedExample" :options="examples" optionLabel="name" optionGroupLabel="label"
                optionGroupChildren="items" placeholder="select an example" @change="loadExample"></Dropdown>
            <Button class="p-button-rounded" icon="pi pi-arrow-right" v-tooltip.bottom="'to simulator'"
                @click="toSimu()"></Button>
        </template>

    </Toolbar>
    <TabView>
        <TabPanel header="TPS File">
            <Textarea style="white-space: pre;  overflow: auto;" v-model="source" rows="20" cols="36"></Textarea>
        </TabPanel>
        <TabPanel header="Bin File">
            <ScrollPanel ref="scroll" style="width: 100%; height: 540px">
                <div width="100%" v-for="(item, index) in lines">
                    <p :ref="'ad_' + index" v-if="index == this.linenumber" style="background-color: red;">{{ item }}
                    </p>
                    <p :ref="'ad_' + index" v-else>{{ item }}</p>
                </div>
            </ScrollPanel>
        </TabPanel>
    </TabView>
</template>

<script>
export default {
    props: {
        linenumber: Number
    },
    emits: ['updatebin'],
    data() {
        return {
            source: "",
            hex: "",
            lines: [],
            bin: [],
            selectedExample: {},
            examples: []
        }
    },
    mounted() {
        fetch("/down/tps_examples/examples.json")
            .then((res) => res.json())
            .then((data) => {
                this.exp = data;
                for (const [key, value] of Object.entries(data)) {
                    let item = {
                        "label": key,
                        "items": value
                    }
                    this.examples.push(item);
                }
            })
            .catch((err) => console.log(err.message));
    },
    methods: {
        toSimu() {
            let mysrc = this.source.split("\n");
            mysrc.forEach(element => {
                if (!element.startsWith("#") && !(element === "")) {
                    let cmdsParts = element.split(",");
                    let addr = Number(cmdsParts[0]);
                    let cmd = Number("0x" + cmdsParts[1]);
                    let data = Number("0x" + cmdsParts[2]);
                    this.bin[addr] = (cmd * 16 + data) & 0xff;
                }
            });
            let addr = 0;
            this.lines = [];
            this.bin.forEach(element => {
                let line = String(addr).padStart(4,'0') + ": " + element.toString(16);
                this.lines.push(line)
                addr++;
            });
            this.$emit('updatebin', this.bin)
        },
        loadExample() {
            let url = "/down/tps_examples/" + this.selectedExample.file;
            let that = this;
            fetch(url, {
                mode: 'no-cors'
            })
                .then((res) => res.text())
                .then(txt => {
                    that.source = txt;
                })
                .catch((err) => console.log(err.message));
        },
        goto(refName) {
            var element = this.$refs[refName];
            var top = element.offsetTop;
            window.scrollTo(0, top);
        }
    },
    watch: {
        linenumber(linenumber) {
            this.goto("ad_" + linenumber);
        },
    }
}
</script>

<style>
.toolbar-label {
    color: white;
}
</style>