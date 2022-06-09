<template>
    <Toolbar>
        <template #start>
            <div class="toolbar-label">TPS Assembler</div>
        </template>
        <template #end>
            <Button class="p-button-rounded" icon="pi pi-folder-open" v-tooltip.bottom="'load file from local'"
                @click="$refs.file.click()"></Button>
            <input type="file" ref="file" name="inputFile" id="inputFile" style="display: none" />
            <Button class="p-button-rounded" icon="pi pi-save" v-tooltip.bottom="'save file to local'"
                @click="saveFile()"></Button>
            <Dropdown v-model="selectedExample" :options="examples" optionLabel="name" optionGroupLabel="label"
                optionGroupChildren="items" placeholder="select an example" @change="loadExample"></Dropdown>
            <i class="pi p-toolbar-separator mr-1" />
        </template>
    </Toolbar>
    <TabView v-model:activeIndex="tabIndex">
        <TabPanel header="ASM File">
            <label for="filename">Filename: </label>
            <InputText id="filename" name="filename" v-model="filename" />
            <Textarea style="white-space: pre;  overflow: auto;" v-model="asm" rows="20" cols="36"></Textarea>
            <Button class="p-button-rounded" icon="pi pi-arrow-right" v-tooltip.bottom="'compile'"
                @click="assemble()"></Button>
        </TabPanel>
        <TabPanel header="TPS File">
            <label for="filename">Filename: </label>
            <InputText id="filename" name="filename" v-model="filename" />
            <Textarea ref="tpsfile" style="white-space: pre;  overflow: auto;" v-model="source" rows="20"
                cols="36"></Textarea>
            <Button class="p-button-rounded" icon="pi pi-arrow-right" v-tooltip.bottom="'simulate'"
                @click="toSimu()"></Button>
        </TabPanel>
        <TabPanel header="Bin File">
            <ScrollPanel ref="scroll" style="width: 100%; height: 540px">
                <div :ref="'ad_' + index" width="100%" v-for="(item, index) in lines">
                    <p v-if="index == this.linenumber" class="line-highlight">{{ item }}
                    </p>
                    <p v-else>{{ item }}</p>
                </div>
            </ScrollPanel>
            <div>
                <label style="padding: 70px 0;" for="filename">Output format: </label>
                <Dropdown v-model="outputformat" :options="outputformats" placeholder="select an format"></Dropdown>
                <Button class="p-button-rounded" icon="pi pi-save" v-tooltip.bottom="'export file'"
                    @click="exportFile()"></Button>
            </div>
        </TabPanel>
    </TabView>
</template>

<script>
import FileSaver from 'file-saver';
import MemoryMap from 'nrf-intel-hex';

export default {
    props: {
        linenumber: Number,
        example: String,
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
            filename: "file",
            outputformats: ["IntelHEX", "TPS", "BIN"],
            outputformat: "TPS",
        }
    },
    mounted() {
        fetch("https://wkla.no-ip.biz/down/tps_examples/examples.json")
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
                if (this.example) {
                    this.selectedExample = {
                        file: this.example,
                        name: this.example,
                    }
                    this.loadExample()
                }
            })
            .catch((err) => console.log(err.message));
        let that = this
        document.getElementById('inputFile').addEventListener('change', function () {
            var file = new FileReader();
            file.onload = () => {
                that.source = file.result;
            }
            file.readAsText(this.files[0]);
        });
    },
    methods: {
        saveFile() {
            var blob = new Blob([this.source], { type: "text/plain;charset=utf-8" });
            FileSaver.saveAs(blob, this.filename);
        },
        exportFile() {
            let pos = this.filename.lastIndexOf(".")
            let file = this.filename
            if (pos >= 0) {
                file = this.filename.substring(0, pos)
            }
            switch (this.outputformat) {
                case "TPS":
                    var blob = new Blob([this.source], { type: "text/plain;charset=utf-8" });
                    FileSaver.saveAs(blob, file + ".tps");
                    break;
                case "BIN":
                    let mbytes = new Uint8Array(this.bin);
                    var blob = new Blob([mbytes], { type: "application/octet-stream" });
                    FileSaver.saveAs(blob, file + ".bin");
                    break;
                case "IntelHEX":
                    let memMap = new MemoryMap();
                    let bytes = new Uint8Array(this.bin);
                    memMap.set(0x00, bytes); // The block with 'bytes' will start at offset 0x0FF80000
                    let string = memMap.asHexString();
                    var blob = new Blob([string], { type: "text/plain;charset=utf-8" });
                    FileSaver.saveAs(blob, file + ".hex");
                    break;
                    break;
            }
        },
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
            let url = "https://wkla.no-ip.biz/down/tps_examples/" + this.selectedExample.file;
            let that = this;
            fetch(url)
                .then((res) => res.text())
                .then(txt => {
                    that.source = txt;
                    this.toSimu();
                })
                .catch((err) => console.log(err.message));
            this.tabIndex = 0;
            this.filename = this.selectedExample.file;
        },
        goto(refName) {
            //console.log(this.$refs)
            var line = this.$refs[refName];
            line.scrollIntoView;
        },
        assemble() {
            var actionPostUrl =
                "https://localhost:9543/api/v1/asm/generate";
            console.log("trying to connect to asm server")
            var options = {
                method: "POST",
                body: JSON.stringify({
                    outputformat: 'tps',
                    asm: this.asm,
                    hardware: this.hardware,
                    name: this.filename,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            };
            let that = this;
            fetch(actionPostUrl, options)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    that.source = data.destination;
                    that.filename = data.name;
                    this.toSimu();
                })
                .catch((err) => console.log(err.message));
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
    width: 8rem;
}
</style>