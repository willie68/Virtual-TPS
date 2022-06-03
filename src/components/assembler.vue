<template>
    <Toolbar>
        <template #start>
            <div class="toolbar-label">TPS Assembler</div>
        </template>
        <template #end>
            <Dropdown v-model="selectedExample" :options="examples" optionLabel="name" optionGroupLabel="label"
                optionGroupChildren="items" placeholder="select an example" @change="loadExample"></Dropdown>
            <i class="pi p-toolbar-separator mr-1" />
            <Button class="p-button-rounded" icon="pi pi-arrow-right" v-tooltip.bottom="'to simulator'"
                @click="toSimu()"></Button>
        </template>
    </Toolbar>
    <TabView v-model:activeIndex="tabIndex">
        <TabPanel header="TPS File">
            <Textarea style="white-space: pre;  overflow: auto;" v-model="source" rows="20" cols="36"></Textarea>
        </TabPanel>
        <TabPanel header="ASM File">
            <Textarea style="white-space: pre;  overflow: auto;" v-model="asm" rows="20" cols="36"></Textarea>
        </TabPanel>
        <TabPanel header="Bin File">
            <ScrollPanel ref="scroll" style="width: 100%; height: 540px">
                <div :ref="'ad_' + index" width="100%" v-for="(item, index) in lines">
                    <p v-if="index == this.linenumber" class="line-highlight">{{ item }}
                    </p>
                    <p v-else>{{ item }}</p>
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
            com: [],
            selectedExample: {},
            examples: [],
            tabIndex: 0,
            asm: "",
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
            this.bin = [];
            this.com = [];
            mysrc.forEach(element => {
                if (!element.startsWith("#") && !(element === "")) {
                    let cmdsParts = element.split(",");
                    let addr = Number(cmdsParts[0]);
                    let cmd = Number("0x" + cmdsParts[1]);
                    let data = Number("0x" + cmdsParts[2]);
                    this.bin[addr] = (cmd * 16 + data) & 0xff;
                    this.com[addr] = cmdsParts[3] ? cmdsParts[3] : "";
                }
            });
            let addr = 0;
            this.lines = [];
            this.bin.forEach(element => {
                let line = '0x' + addr.toString(16).padStart(4, '0') + ": 0x" + element.toString(16).padStart(2, '0') + "  " + this.com[addr];
                this.lines.push(line)
                addr++;
            });
            this.tabIndex = 2;
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
                    this.toSimu();
                })
                .catch((err) => console.log(err.message));
            this.tabIndex = 0;
        },
        goto(refName) {
            //console.log(this.$refs)
            var line = this.$refs[refName];
            line.scrollIntoView;
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

.line-highlight {
    background-color: whitesmoke;
    color: black;
}

.p-dropdown {
    width: 12rem;
}
</style>