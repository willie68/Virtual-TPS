<template>
    <Panel header="Internal" style="width: 100%">
        <div class="grid">
            <div class="col">
                <label for="rega">A</label>
            </div>
            <div class="col">
                <InputText id="rega" v-model="regai" size="4" mode="decimal" v-tooltip="'Register A'" :readonly="true">
                </InputText>
            </div>
            <div class="col">
                <label for="regb">B</label>
            </div>
            <div class="col">
                <InputText id="regb" v-model="regbi" size="4" mode="decimal" v-tooltip="'Register B'" :readonly="true">
                </InputText>
            </div>
            <div class="col">
                <label for="page">Page</label>
            </div>
            <div class="col">
                <InputText id="page" v-model="pagei" size="4" mode="decimal" v-tooltip="'Page'" :readonly="true">
                </InputText>
            </div>
        </div>
        <div class="grid">
            <div class="col">
                <label for="regc">C</label>
            </div>
            <div class="col">
                <InputText id="regc" v-model="regci" size="4" mode="decimal" v-tooltip="'Register C'" :readonly="true">
                </InputText>
            </div>
            <div class="col">
                <label for="regd">D</label>
            </div>
            <div class="col">
                <InputText id="regd" v-model="regdi" size="4" mode="decimal" v-tooltip="'Register D'" :readonly="true">
                </InputText>
            </div>
            <div class="col">
                <label for="raddr">RAddr</label>
            </div>
            <div class="col">
                <InputText id="raddr" v-model="raddri" size="4" mode="decimal" v-tooltip="'Rücksprungadresse'"
                    :readonly="true"></InputText>
            </div>
        </div>
        <div class="grid">
            <div class="col">
                <label v-if="['ArduinoTPS', 'Microbit', 'ESP32', 'RPI2040'].includes(this.selectedHardware)" for="rege">E</label>
            </div>
            <div class="col">
                <InputText v-if="['ArduinoTPS', 'Microbit', 'ESP32', 'RPI2040'].includes(this.selectedHardware)" id="rege" v-model="regei" size="4" mode="decimal"
                    v-tooltip="'Register E'" :readonly="true">
                </InputText>
            </div>
            <div class="col">
                <label v-if="['ArduinoTPS', 'Microbit', 'ESP32', 'RPI2040'].includes(this.selectedHardware)" for="regf">F</label>
            </div>
            <div class="col">
                <InputText v-if="['ArduinoTPS', 'Microbit', 'ESP32', 'RPI2040'].includes(this.selectedHardware)" id="regf" v-model="regfi" size="4" mode="decimal"
                    v-tooltip="'Register F'" :readonly="true">
                </InputText>
            </div>
            <div class="col">
                <label for="addr">Addr</label>
            </div>
            <div class="col">
                <InputText id="addr" v-model="addri" size="4" mode="decimal" v-tooltip="'Adresse'" :readonly="true">
                </InputText>
            </div>
        </div>
        <div class="grid">
            <div class="col">
                <label for="cmd">cmd</label>
            </div>
            <div class="col">
                <InputText id="cmd" v-model="cmdi" size="4" mode="decimal" v-tooltip="'Command'" :readonly="true">
                </InputText>
            </div>
            <div class="col">
                <label for="data">data</label>
            </div>
            <div class="col">
                <InputText id="data" v-model="datai" size="4" mode="decimal" v-tooltip="'data'" :readonly="true">
                </InputText>
            </div>
            <div class="col">
                <label for="dly">delay</label>
            </div>
            <div class="col">
                <InputText id="dly" v-model="dly" size="4" mode="decimal" v-tooltip="'delay'" :readonly="true">
                </InputText>
            </div>
        </div>
        <div class="grid">
        <div class="col" v-if="['ArduinoTPS', 'Microbit', 'ESP32', 'RPI2040'].includes(this.selectedHardware)">
            <label for="stack">Stack</label>
            <Listbox id="stack" :options="stacki" :readonly="true" emptyMessage="no stack"></Listbox>
        </div>
        <div class="col" v-if="['ArduinoTPS', 'Microbit', 'ESP32', 'RPI2040'].includes(this.selectedHardware)">
            <label for="callstack">Callstack</label>
            <Listbox id="callstack" :options="callstacki" :readonly="true" emptyMessage="no callstack"></Listbox>
        </div>
        </div>
    </Panel>
</template>

<script>
export default {
    props: {
        rega: Number,
        regb: Number,
        regc: Number,
        regd: Number,
        rege: Number,
        regf: Number,
        addr: Number,
        page: Number,
        raddr: Number,
        stack: Array,
        cmd: Number,
        data: Number,
        dly: Number,
        selectedHardware: String,
        callstack: Array,
    },
    methods: {
        toHex(value, digits) {
            return "0x" + value.toString(16).padStart(digits, '0');
        }
    },
    computed: {
        regai: {
            get() {
                return this.toHex(this.rega, 2);
            }
        },
        regbi: {
            get() {
                return this.toHex(this.regb, 2);
            }
        },
        regci: {
            get() {
                return this.toHex(this.regc, 2);
            }
        },
        regdi: {
            get() {
                return this.toHex(this.regd, 2);
            }
        },
        regei: {
            get() {
                return this.toHex(this.rege, 2);
            }
        },
        regfi: {
            get() {
                return this.toHex(this.regf, 2);
            }
        },
        addri: {
            get() {
                if (this.addr < 0) {
                    return 'n.n.'
                }
                return this.toHex(this.addr, 4);
            }
        },
        pagei: {
            get() {
                return this.toHex(this.page, 2);
            }
        },
        raddri: {
            get() {
                return this.toHex(this.raddr, 4);
            }
        },
        cmdi: {
            get() {
                return this.toHex(this.cmd, 1);
            }
        },
        datai: {
            get() {
                return this.toHex(this.data, 1);
            }
        },
        stacki: {
            get() {
                let stacki = []
                this.stack.forEach(element => {
                    stacki.push(this.toHex(element, 2))
                });
                return stacki.reverse();
            }
        },
        callstacki: {
            get() {
                let callstacki = []
                this.callstack.forEach(element => {
                    callstacki.push(this.toHex(element, 2))
                });
                return callstacki.reverse();
            }
        },
    }
}
</script>