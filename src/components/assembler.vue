<template>
    <Toolbar>
        <template #start>
            <div class="toolbar-label">TPS Assembler</div>
        </template>
        <template #end>
            <Button class="p-button-rounded  mx-1" icon="pi pi-folder-open" v-tooltip.bottom="'load file from local'"
                @click="$refs.file.click()"></Button>
            <input type="file" ref="file" name="inputFile" id="inputFile" style="display: none" />
            <Button class="p-button-rounded  mx-1" icon="pi pi-save" v-tooltip.bottom="'save file to local'"
                @click="saveFile()"></Button>
            <Dropdown v-model="selectedExample" :options="examples" optionLabel="name" optionGroupLabel="label"
                optionGroupChildren="items" placeholder="select an example" @change="loadExample"></Dropdown>
            <i class="pi p-toolbar-separator mr-1" />
        </template>
    </Toolbar>
    <TabView v-model:activeIndex="tabIndex">
        <TabPanel header="ASM File">
            <label class="mx-1" for="filename">Filename: </label>
            <InputText id="filename" name="filename" v-model="filename" size="16" />
            <ScrollPanel style="width: 100%; height: 540px">
                <prism-editor class="my-editor" v-model="asm" :highlight="highlighter" line-numbers></prism-editor>
            </ScrollPanel>
            <br />
            <Button class="p-button-rounded" icon="pi pi-arrow-right" v-tooltip.bottom="'compile'" @click="assemble()"
                label="Compile"></Button>
        </TabPanel>
        <TabPanel header="TPS File">
            <label class="mx-1" for="filename">Filename: </label>
            <InputText id="filename" name="filename" v-model="filename" size="16" />
            <ScrollPanel style="width: 100%; height: 540px">
                <prism-editor class="my-editor" v-model="source" :highlight="highlighter" line-numbers></prism-editor>
            </ScrollPanel>
            <br />
            <Button class="p-button-rounded" icon="pi pi-arrow-right" v-tooltip.bottom="'simulate'" @click="toSimu()"
                label="Simulate"></Button>
        </TabPanel>
        <TabPanel header="Bin File">
            <label class="mx-1" for="filename">Filename: </label>
            <InputText id="filename" name="filename" readonly="true" v-model="filename" size="16" />
            <ScrollPanel ref="scroll" style="width: 100%; height: 540px">
                <div :ref="'ad_' + index" width="100%" v-for="(item, index) in lines">
                    <p v-if="index == this.linenumber" class="line-highlight">{{ item }}
                    </p>
                    <p v-else>{{ item }}</p>
                </div>
            </ScrollPanel>
            <br />
            <div>
                <Button class="p-button-rounded" icon="pi pi-save" v-tooltip.bottom="'export as'" @click="exportFile()"
                    label="export as"></Button>
                <Dropdown v-model="outputformat" :options="outputformats" placeholder="select an format"></Dropdown>
            </div>
        </TabPanel>
        <TabPanel header="Code">
            <ScrollPanel ref="scroll" style="width: 100%; height: 540px">
                <font style="font-family: monospace;">
                    <div :ref="'ad_' + index" width="100%" v-for="(item, index) in prgcode">
                        <p v-if="index == this.linenumber + 1" class="line-highlight"><pre>{{ item }}</pre>
                        </p>
                        <p v-else><pre>{{ item }}</pre></p>
                    </div>
                </font>
            </ScrollPanel>
        </TabPanel>
    </TabView>
</template>

<script>
import FileSaver from 'file-saver';
import MemoryMap from 'nrf-intel-hex';
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-asciidoc';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles

export default {
    components: {
        PrismEditor,
    },
    props: {
        linenumber: Number,
        example: String,
        hardware: String,
    },
    emits: ['updatebin', 'updatemode'],
    data() {
        return {
            source: "",
            hex: "",
            lines: [],
            bin: [],
            prgcode: [], // contains the code format for manual programming
            com: [],
            selectedExample: {},
            examples: [],
            tabIndex: 0,
            asm: "",
            filename: "file",
            outputformats: ["IntelHEX", "TPS", "BIN", "CODE"],
            outputformat: "TPS",
            placetps: "put your tps code here",
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
            let filename = this.files[0].name
            that.filename = filename.substring(0, filename.lastIndexOf('.'))
            let ext = filename.substring(filename.lastIndexOf('.') + 1)
            var file = new FileReader();
            file.onload = () => {
                if (ext === 'tps') {
                    that.source = file.result;
                    that.tabIndex = 1
                }
                if (ext === 'asm') {
                    that.asm = file.result;
                    that.tabIndex = 0
                }
            }
            file.readAsText(this.files[0]);
        });
    },
    methods: {
        highlighter(code) {
            console.log(code)
            // return code; 
            return highlight(code, languages.asciidoc); // languages.<insert language> to return html with markup
        },
        saveFile() {
            if (this.tabIndex == 0) {
                var blob = new Blob([this.asm], { type: "text/plain;charset=utf-8" });
                FileSaver.saveAs(blob, this.filename + '.asm');
            } else {
                var blob = new Blob([this.source], { type: "text/plain;charset=utf-8" });
                FileSaver.saveAs(blob, this.filename + '.tps');
            }
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
                case "CODE":
                    let text = ""
                    this.prgcode.forEach(line => {
                        text = text + line + "\r\n"
                    })
                    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
                    FileSaver.saveAs(blob, file + ".code");
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
            this.prgcode = [];
            let line = "Address  BD Cmd  Data";
            this.prgcode.push(line)
            this.bin.forEach(element => {
                let line = '0x' + addr.toString(16).padStart(4, '0') + ": 0x" + element.toString(16).padStart(2, '0') + "  " + this.com[addr];
                this.lines.push(line)
                let cmd = (element & 0xF0) >> 4;
                let data = (element & 0x0F);
                line = addr.toString(2).padStart(8, '0') + " " + element.toString(16).padStart(2, '0') + " " + cmd.toString(2).padStart(4, '0') + " " + data.toString(2).padStart(4, '0');
                this.prgcode.push(line)
                addr++;
            });
            this.tabIndex = 2;
            this.$emit('updatebin', this.bin)
        },
        loadExample() {
            let filename = this.selectedExample.file
            let url = "https://wkla.no-ip.biz/down/tps_examples/" + filename;
            let that = this;
            fetch(url)
                .then((res) => res.text())
                .then(txt => {
                    that.source = txt;
                    this.toSimu();
                })
                .catch((err) => {
                    that.placetps = 'can\'t load example:' + err.message
                    console.log(err.message)
                });
            this.tabIndex = 1;
            let pos = filename.lastIndexOf(".")
            let file = filename
            if (pos >= 0) {
                file = filename.substring(0, pos)
            }
            this.filename = file;
        },
        goto(refName) {
            //console.log(this.$refs)
            //var line = this.$refs[refName];
            //line.scrollIntoView;
        },
        assemble() {
            var actionPostUrl = this.asmurl
            //"https://localhost:9543/api/v1/asm/generate";
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
                }
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
        tabIndex(tabIndex) {
            switch (tabIndex) {
                case 0:
                    this.$emit('updatemode', 'asm')
                    break;
                case 1:
                    this.$emit('updatemode', 'tps')
                    break;
                default:
                    this.$emit('updatemode', 'tps')
                    break;
            }
        }
    }
}
</script>

<style>
/* workaround for word wrap bug */
.prism-editor__textarea {
  width: 999999px !important;
}
.prism-editor__editor {
  white-space: pre !important;
}
.prism-editor__container {
  overflow-x: scroll !important;
}

.my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #17212f;
    color: #ccc;

    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
    outline: none;
}

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