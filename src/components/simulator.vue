<template>
    <Toolbar>
        <template #start>
            <div class="toolbar-label">TPS Simulator</div>
        </template>
        <template #end>
            <Dropdown v-model="selectedHardware" :options="hardwares"></Dropdown>
            <i class="pi p-toolbar-separator mr-1" />
            <Button ref="btnstart" class="p-button-rounded mx-1" icon="pi pi-play" v-tooltip.bottom="'start'"
                :disabled="running" @click="start()"></Button>
            <Button class="p-button-rounded mx-1" icon="pi pi-stop" v-tooltip.bottom="'stop'" :disabled="!running"
                @click="stop()"></Button>
            <Button class="p-button-rounded mx-1" icon="pi pi-step-forward-alt" v-tooltip.bottom="'next step'"
                :disabled="running" @click="next()"></Button>
            <Button class="p-button-rounded mx-1" icon="pi pi-undo" v-tooltip.bottom="'restart'" :disabled="running"
                @click="reset()"></Button>
        </template>
    </Toolbar>
    <div class="flex flex-wrap card-container blue-container" style="width: 100%">
        <div class="flex align-items-center justify-content-center font-bold text-white m-2 border-round"
            style="min-width: 500px; min-height: 100px">
            <Siminputs v-model:din1="din1" v-model:din2="din2" v-model:din3="din3" v-model:din4="din4"
                v-model:adc1="adc1" v-model:adc2="adc2" v-model:rc1="rc1" v-model:rc2="rc2" v-model:prg="prg"
                v-model:sel="sel" :selectedHardware="selectedHardware"></Siminputs>
        </div>
        <div class="flex align-items-center justify-content-center font-bold text-white m-2 border-round"
            style="min-width: 500px; min-height: 100px">
            <Simoutputs :dout1="dout1" :dout2="dout2" :dout3="dout3" :dout4="dout4" :pwm1="pwm1" :pwm2="pwm2"
                :srv1="srv1" :srv2="srv2" :tone="tone" :selectedHardware="selectedHardware"></Simoutputs>
        </div>
    </div>

    <div class="flex flex-wrap card-container blue-container" style="width: 100%">
        <div class="flex align-items-center justify-content-center font-bold text-white m-2 border-round"
            style="min-width: 500px; min-height: 100px">
            <Siminternal ref="siminternal" :rega="rega" :regb="regb" :regc="regc" :regd="regd" :rege="rege" :regf="regf"
                :addr="addr" :page="page" :raddr="raddr" :stack="stack" :cmd="cmd" :data="data" :dly="dly"
                :selectedHardware="selectedHardware" :callstack="callstack"></Siminternal>
        </div>
    </div>
</template>

<script>
import Siminputs from './siminputs.vue';
import Simoutputs from './simoutputs.vue';
import Siminternal from './siminternal.vue';
import { setTransitionHooks } from 'vue';
export default {
    props: {
        bin: Array,
    },
    emits: ["updateAddr", "updateHardware"],
    data() {
        return {
            din1: false,
            din2: false,
            din3: false,
            din4: false,
            adc1: 0,
            adc2: 0,
            rc1: 0,
            rc2: 0,
            dout1: false,
            dout2: false,
            dout3: false,
            dout4: false,
            pwm1: 0,
            pwm2: 0,
            srv1: 0,
            srv2: 0,
            sel: false,
            prg: false,
            tone: 0,
            rega: 0,
            regb: 0,
            regc: 0,
            regd: 0,
            rege: 0,
            regf: 0,
            addr: -1,
            page: 0,
            raddr: 0,
            stack: [],
            callstack: [],
            src: [],
            cmd: 0,
            data: 0,
            dly: 0,
            started: false,
            running: false,
            selectedHardware: "ArduinoTPS",
            hardwares: ['Holtek', 'ArduinoTPS', 'TinyTPS', 'ATMega8', 'Microbit', 'RP2040', 'ESP32'],
            myinterval: 0,
            delays: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 30000, 60000],
        };
    },
    methods: {
        start() {
            let that = this;
            this.myinterval = setInterval(function () {
                that.next();
            }, 100);
            this.running = true;
        },
        stop() {
            clearInterval(this.myinterval);
            this.running = false;
        },
        next() {
            if (!this.started) {
                console.log("start")
                this.reset();
                this.src = this.bin;
                this.started = true;
            }
            if (this.src.length > this.addr) {
                this.dly = 0;
                const element = this.src[this.addr];
                this.cmd = (element & 0xF0) >> 4;
                this.data = element & 0x0F;
                this.executeCommand(this.cmd, this.data);
                this.addr += 1;
                this.$emit('updateAddr', this.addr)
                let nextElement = this.src[this.addr];
                let cmd = (nextElement & 0xF0) >> 4;
                let data = nextElement & 0x0F;
                this.preUpdate(cmd, data);
            } else {
                this.reset();
            }
        },
        reset() {
            this.rega = 0;
            this.regb = 0;
            this.regc = 0;
            this.regd = 0;
            this.rege = 0;
            this.regf = 0;
            this.doPort(0);
            this.pwm1 = 0;
            this.pwm2 = 0;
            this.srv1 = 0;
            this.srv2 = 0;
            this.tone = 0;
            this.addr = 0;
            this.page = 0;
            this.raddr = 0;
            this.stack = [];
            this.dly = 0;
            this.callstack = [];
            this.started = false;
            this.$emit('updateAddr', this.addr)
        },
        preUpdate(cmd, data) {
            switch (cmd) {
                case 2:
                    let myms = this.delays[data];
                    this.dly = myms;
                    console.log('predelay: ', myms);
                    break;
                default:
                    break;
            }
        },
        executeCommand(cmd, data) {
            this.dly = 0;
            switch (cmd) {
                case 1:
                    this.doPort(data);
                    break;
                case 2:
                    this.doDelay(data);
                    break;
                case 3:
                    this.addr = this.addr - data - 1;
                    break;
                case 4:
                    this.rega = data;
                    break;
                case 5:
                    this.doIsA(data);
                    break;
                case 6:
                    this.doAIs(data);
                    break;
                case 7:
                    this.doCalc(data);
                    break;
                case 8:
                    this.page = data;
                    break;
                case 9:
                    this.addr = (16 * this.page) + data - 1;
                    break;
                case 10:
                    if (this.regc > 0) {
                        this.regc -= 1;
                        this.regc &= 0x0F;
                        this.addr = (16 * this.page) + data - 1;
                    }
                    break;
                case 11:
                    if (this.regd > 0) {
                        this.regd -= 1;
                        this.regd &= 0x0F;
                        this.addr = (16 * this.page) + data - 1;
                    }
                    break;
                case 12:
                    this.doSkipIf(data);
                    break;
                case 13:
                    this.callstack.push(this.addr);
                    this.addr = (16 * this.page) + data - 1;
                    break;
                case 14:
                    if (data == 0) {
                        if (this.callstack.length > 0) {
                            this.addr = this.callstack.pop();
                        } else {
                            this.reset();
                        }
                    }
                    if (data == 15) {
                        this.reset();
                    }
                    break;
                case 15:
                    this.doByte(data);
                    break;
                default:
                    break;
            }
        },
        doPort(data) {
            this.dout1 = (data & 0x01) > 0
            this.dout2 = (data & 0x02) > 0
            this.dout3 = (data & 0x04) > 0
            this.dout4 = (data & 0x08) > 0
        },
        doDelay(data) {
            let myms = this.delays[data];
            this.dly = myms;
            console.log('ms: ', myms);
            var start = Date.now(),
                now = start;
            while ((now - start) < myms) {
                now = Date.now();
            }
            console.log(now)
            this.dly = 0;
        },
        doIsA(data) {
            switch (data) {
                case 0:
                    let a = this.rega;
                    this.rega = this.regb;
                    this.regb = a;
                    break;
                case 1:
                    this.regb = this.rega;
                    break;
                case 2:
                    this.regc = this.rega;
                    break;
                case 3:
                    this.regd = this.rega;
                    break;
                case 4:
                    this.doPort(this.rega);
                    break;
                case 5:
                    this.dout1 = (this.rega & 1) > 0;
                    break;
                case 6:
                    this.dout2 = (this.rega & 1) > 0;
                    break;
                case 7:
                    this.dout3 = (this.rega & 1) > 0;
                    break;
                case 8:
                    this.dout4 = (this.rega & 1) > 0;
                    break;
                case 9:
                    this.pwm1 = Math.trunc(this.rega / 16.0 * 100.0);
                    break;
                case 10:
                    this.pwm2 = Math.trunc(this.rega / 16.0 * 100.0);
                    break;
                case 11:
                    this.srv1 = Math.trunc(this.rega / 16.0 * 180.0);
                    break;
                case 12:
                    this.srv2 = Math.trunc(this.rega / 16.0 * 180.0);
                    break;
                case 13:
                    this.rege = this.rega;
                    break;
                case 14:
                    this.regf = this.rega;
                    break;
                case 15: // push
                    if (this.stack.length < 16) {
                        this.stack.push(this.rega)
                    }
                    break;
                default:
                    break;
            }
        },
        doAIs(data) {
            switch (data) {
                case 1:
                    this.rega = this.regb;
                    break;
                case 2:
                    this.rega = this.regc;
                    break;
                case 3:
                    this.rega = this.regd;
                    break;
                case 4:
                    this.rega = (this.din1 | 0) + ((this.din2 | 0) << 1) + ((this.din3 | 0) << 2) + ((this.din4 | 0) << 3);
                    break;
                case 5:
                    this.rega = this.din1 | 0;
                    break;
                case 6:
                    this.rega = this.din2 | 0;
                    break;
                case 7:
                    this.rega = this.din3 | 0;
                    break;
                case 8:
                    this.rega = this.din4 | 0;
                    break;
                case 9:
                    this.rega = Math.trunc(this.adc1 / 100.0 * 16.0);
                    break;
                case 10:
                    this.rega = Math.trunc(this.adc2 / 100.0 * 16.0);
                    break;
                case 11:
                    this.rega = Math.trunc(this.rc1 / 180.0 * 16.0);
                    break;
                case 12:
                    this.rega = Math.trunc(this.rc2 / 180.0 * 16.0);
                    break;
                case 13:
                    this.rega = this.rege;
                    break;
                case 14:
                    this.rega = this.regf;
                    break;
                case 15: // pop
                    if (this.stack.length > 0) {
                        this.rega = this.stack.pop()
                    }
                    break;
                default:
                    break;
            }
        },
        doCalc(data) {
            switch (data) {
                case 1:
                    this.rega += 1;
                    break;
                case 2:
                    this.rega -= 1;
                    break;
                case 3:
                    this.rega += this.regb;
                    break;
                case 4:
                    this.rega -= this.regb;
                    break;
                case 5:
                    this.rega *= this.regb;
                    break;
                case 6:
                    this.rega /= this.regb;
                    break;
                case 7:
                    this.rega &= this.regb;
                    break;
                case 8:
                    this.rega |= this.regb;
                    break;
                case 9:
                    this.rega ^= this.regb;
                    break;
                case 10:
                    this.rega = ~this.rega;
                    break;
                case 11:
                    this.rega %= this.regb;
                    break;
                case 12:
                    this.rega += (16 * this.regb);
                    break;
                case 13:
                    this.rega = this.regb - this.rega;
                    break;
                case 14:
                    this.rega = this.rega >> 1;
                    break;
                case 15:
                    this.rega = this.rega << 1;
                    break;
                default:
                    break;
            }
            this.rega = this.rega & 0xFF;
        },
        doSkipIf(data) {
            let skip = false;
            switch (data) {
                case 0:
                    skip = this.rega == 0;
                    break;
                case 1:
                    skip = this.rega > this.regb;
                    break;
                case 2:
                    skip = this.rega < this.regb;
                    break;
                case 3:
                    skip = this.rega == this.regb;
                    break;
                case 4:
                    skip = this.din1;
                    break;
                case 5:
                    skip = this.din2;
                    break;
                case 6:
                    skip = this.din3;
                    break;
                case 7:
                    skip = this.din4;
                    break;
                case 8:
                    skip = !this.din1;
                    break;
                case 9:
                    skip = !this.din2;
                    break;
                case 10:
                    skip = !this.din3;
                    break;
                case 11:
                    skip = !this.din4;
                    break;
                case 12:
                    skip = this.prg;
                    break;
                case 13:
                    skip = this.sel;
                    break;
                case 14:
                    skip = !this.prg;
                    break;
                case 15:
                    skip = !this.sel;
                    break;
                default:
                    break;
            }
            if (skip) {
                this.addr += 1;
            }
        },
        doByte(data) {
            switch (data) {
                case 0:
                    this.rega = Math.trunc((this.adc1 / 100.0) * 256);
                    break;
                case 1:
                    this.rega = Math.trunc((this.adc2 / 100.0) * 256);
                    break;
                case 2:
                    this.rega = Math.trunc((this.rc1 / 180.0) * 256);
                    break;
                case 3:
                    this.rega = Math.trunc((this.rc2 / 180.0) * 256);
                    break;
                case 4:
                    this.pwm1 = Math.trunc((this.rega / 256.0) * 100.0);
                    break;
                case 5:
                    this.pwm2 = Math.trunc((this.rega / 256.0) * 100.0);
                    break;
                case 6:
                    this.srv1 = Math.trunc((this.rega / 256.0) * 180.0);
                    break;
                case 7:
                    this.srv2 = Math.trunc((this.rega / 256.0) * 180.0);
                    break;
                case 8:
                    this.tone = this.rega;
                    break;
                default:
                    break;
            }
            this.rega = this.rega & 0xFF;
        }
    },
    watch: {
        bin(bin) {
            this.reset();
        },
        selectedHardware(selectedHardware) {
            this.$emit('updateHardware', selectedHardware);
        }
    },
    components: { Siminputs, Simoutputs, Siminternal }
}
</script>

<style scoped>
.p-combobox {
    width: 10rem;
}
</style>