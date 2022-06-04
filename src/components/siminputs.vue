<template>
    <Panel header="Inputs">
        <div class="grid">
            <div class="col">
                <label for="Din4">Din 4</label><br />
                <InputSwitch id="Din4" name="Din 4" v-model="din4i" />
            </div>
            <div class="col">
                <label for="Din3">Din 3</label><br />
                <InputSwitch id="Din3" name="Din 3" v-model="din3i" />
            </div>
            <div class="col">
                <label for="Din2">Din 2</label><br />
                <InputSwitch id="Din2" name="Din 2" v-model="din2i" />
            </div>
            <div class="col">
                <label for="Din1">Din 1</label><br />
                <InputSwitch id="Din1" name="Din 1" v-model="din1i" />
            </div>
            <div class="col">
                <label for="Din">Din</label><br />
                {{ din }}
            </div>
        </div>
        <div class="grid">
            <div class="col">
                <label for="ADC1">ADC 1</label><br />
                <Knob id="ADC1" name="ADC1" v-model="adc1i" :min="0" :max="100" valueTemplate="{value}%" :size="70" />
                <font size="1rem">
                    {{ad1hex}}
                </font> 
            </div>
            <div v-if="['ArduinoTPS', 'Microbit', 'ESP32'].includes(this.selectedHardware)" class="col">
                <label for="ADC2">ADC 2</label><br />
                <Knob id="ADC2" name="ADC2" v-model="adc2i" :min="0" :max="100" valueTemplate="{value}%" :size="70" />
                <font size="1rem">
                {{ad2hex}}
                </font>
            </div>
            <div v-if="['ArduinoTPS', 'Microbit', 'ESP32'].includes(this.selectedHardware)" class="col">
                <label for="RC1">RC 1</label><br />
                <Knob id="RC1" name="RC1" v-model="rc1i" :min="0" :max="180" valueTemplate="{value}°" :size="70" />
                <font size="1rem">
                {{rc1hex}}
                </font>
            </div>
            <div v-if="['ArduinoTPS', 'Microbit', 'ESP32'].includes(this.selectedHardware)" class="col">
                <label for="RC2">RC 2</label><br />
                <Knob id="RC2" name="RC2" v-model="rc2i" :min="0" :max="180" valueTemplate="{value}°" :size="70" />
                <font size="1rem">
                {{rc2hex}}
                </font>
            </div>
        </div>
        <div class="grid">
            <div class="col">
                <label for="SEL">SEL</label><br />
                <ToggleButton id="SEL" name="SEL" v-model="seli" onLabel="pressed" offLabel="not pressed" onIcon="pi pi-check"
                    offIcon="pi pi-times"/>
            </div>
            <div class="col">
                <label for="PRG">PRG</label><br />
                <ToggleButton id="PRG" name="PRG" v-model="prgi" onLabel="pressed" offLabel="not pressed" onIcon="pi pi-check"
                    offIcon="pi pi-times" />
            </div>
        </div>
    </Panel>
</template>

<script>
export default {
    props: {
        din1: Boolean,
        din2: Boolean,
        din3: Boolean,
        din4: Boolean,
        adc1: Number,
        adc2: Number,
        rc1: Number,
        rc2: Number,
        prg: Boolean,
        sel: Boolean,
        selectedHardware: String,
    },
    emits: ['update:din1', 'update:din2', 'update:din3', 'update:din4', 'update:adc1', 'update:adc2', 'update:rc1', 'update:rc2', 'update:prg', 'update:sel'],
    computed: {
        din: {
            get() {
                let d = (this.din1 | 0) + ((this.din2 | 0) << 1) + ((this.din3 | 0) << 2) + ((this.din4 | 0) << 3);
                return '0x' + d.toString(16)
            }
        },
        din1i: {
            get() {
                return this.din1
            },
            set(value) {
                this.$emit('update:din1', value)
            }
        },
        din2i: {
            get() {
                return this.din2
            },
            set(value) {
                this.$emit('update:din2', value)
            }
        },
        din3i: {
            get() {
                return this.din3
            },
            set(value) {
                this.$emit('update:din3', value)
            }
        },
        din4i: {
            get() {
                return this.din4
            },
            set(value) {
                this.$emit('update:din4', value)
            }
        },
        adc1i: {
            get() {
                return this.adc1
            },
            set(value) {
                this.$emit('update:adc1', value)
            }
        },
        adc2i: {
            get() {
                return this.adc2
            },
            set(value) {
                this.$emit('update:adc2', value)
            }
        },
        ad1hex: {
            get() {
                let v = Math.trunc(this.adc1i / 100.0 * 16.0);
                let v2 = Math.trunc(this.adc1i / 100.0 * 256.0);
                return '0x' + v.toString(16) + ' ( 0x' + v2.toString(16).padStart(2,'0') + ')' 
            }
        },
        ad2hex: {
            get() {
                let v = Math.trunc(this.adc2i / 100.0 * 16.0);
                let v2 = Math.trunc(this.adc2i / 100.0 * 256.0);
                return '0x' + v.toString(16) + ' ( 0x' + v2.toString(16).padStart(2,'0') + ')' 
            }
        },
        rc1i: {
            get() {
                return this.rc1
            },
            set(value) {
                this.$emit('update:rc1', value)
            }
        },
        rc2i: {
            get() {
                return this.rc2
            },
            set(value) {
                this.$emit('update:rc2', value)
            }
        },
        rc1hex: {
            get() {
                let v = Math.trunc(this.rc1i / 180.0 * 16.0);
                let v2 = Math.trunc(this.rc1i / 180.0 * 256.0);
                return '0x' + v.toString(16) + ' ( 0x' + v2.toString(16).padStart(2,'0') + ')' 
            }
        },
        rc2hex: {
            get() {
                let v = Math.trunc(this.rc2i / 180.0 * 16.0);
                let v2 = Math.trunc(this.rc2i / 180.0 * 256.0);
                return '0x' + v.toString(16) + ' ( 0x' + v2.toString(16).padStart(2,'0') + ')' 
            }
        },
        prgi: {
            get() {
                return this.prg
            },
            set(value) {
                this.$emit('update:prg', value)
            }
        },
        seli: {
            get() {
                return this.sel
            },
            set(value) {
                this.$emit('update:sel', value)
            }
        }
    }
}
</script>
