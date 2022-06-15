<template>
    <Panel header="Outputs" style="width: 100%">
        <template #icons>
            <button class="p-panel-header-icon p-link mr-2" @click="showDialog = !showDialog">
                <span class="pi pi-arrow-up-left"></span>
            </button>
        </template>
        <div class="grid">
            <div class="col">
                <label for="Dout4">Dout 4</label><br />
                <ToggleButton id="Dout4" name="Dout4" v-model="dout4" onLabel="" offLabel="" onIcon="pi pi-circle"
                    offIcon="pi pi-circle" />
            </div>
            <div class="col">
                <label for="Dout3">Dout 3</label><br />
                <ToggleButton id="Dout3" name="Dout3" v-model="dout3" onLabel="" offLabel="" onIcon="pi pi-circle"
                    offIcon="pi pi-circle" />
            </div>
            <div class="col">
                <label for="Dout2">Dout 2</label><br />
                <ToggleButton id="Dout2" name="Dout2" v-model="dout2" onLabel="" offLabel="" onIcon="pi pi-circle"
                    offIcon="pi pi-circle" />
            </div>
            <div class="col">
                <label for="Dout1">Dout 1</label><br />
                <ToggleButton id="Dout1" name="Dout1" v-model="dout1" onLabel="" offLabel="" onIcon="pi pi-circle"
                    offIcon="pi pi-circle" />
            </div>
            <div class="col">
                <label for="Dout1">Dout</label><br />
                {{ dout }}
            </div>
        </div>
        <div class="grid">
            <div class="col">
                <label for="PWM1">PWM 1</label><br />
                <Knob id="PWM1" name="PWM1" v-model="pwm1" :min="0" :max="100" readonly=true valueTemplate="{value}%"
                    :size="70" />
            </div>
            <div v-if="['ArduinoTPS', 'Microbit', 'ESP32', 'RPI2040'].includes(this.selectedHardware)" class="col">
                <label for="PWM2">PWM 2</label><br />
                <Knob id="PWM2" name="PWM2" v-model="pwm2" :min="0" :max="100" readonly=true valueTemplate="{value}%"
                    :size="70" />
            </div>
            <div v-if="['ArduinoTPS', 'Microbit', 'ESP32', 'RPI2040'].includes(this.selectedHardware)" class="col">
                <label for="SRV1">Servo 1</label><br />
                <Knob id="SRV1" name="SRV1" v-model="srv1" :min="0" :max="180" readonly=true valueTemplate="{value}°"
                    :size="70" />
            </div>
            <div v-if="['ArduinoTPS', 'Microbit', 'ESP32', 'RPI2040'].includes(this.selectedHardware)" class="col">
                <label for="SRV2">Servo 2</label><br />
                <Knob id="SRV2" name="SRV2" v-model="srv2" :min="0" :max="180" readonly=true valueTemplate="{value}°"
                    :size="70" />
            </div>
        </div>
        <div class="grid" v-if="['RPI2040'].includes(this.selectedHardware)">
            <div class="col">
                <label for="PWM3">PWM 3</label><br />
                <Knob id="PWM3" name="PWM3" v-model="pwm3" :min="0" :max="100" readonly=true valueTemplate="{value}%"
                    :size="70" />
            </div>
            <div class="col">
                <label for="PWM4">PWM 4</label><br />
                <Knob id="PWM4" name="PWM4" v-model="pwm4" :min="0" :max="100" readonly=true valueTemplate="{value}%"
                    :size="70" />
            </div>
            <div class="col">
                <label for="SRV3">Servo 3</label><br />
                <Knob id="SRV3" name="SRV3" v-model="srv3" :min="0" :max="180" readonly=true valueTemplate="{value}°"
                    :size="70" />
            </div>
            <div class="col">
                <label for="SRV4">Servo 4</label><br />
                <Knob id="SRV4" name="SRV4" v-model="srv4" :min="0" :max="180" readonly=true valueTemplate="{value}°"
                    :size="70" />
            </div>
        </div>
        <div v-if="['ArduinoTPS', 'Microbit', 'ESP32', 'RPI2040'].includes(this.selectedHardware)" class="grid">
            <div class="col">
                <label for="tone">Tone</label><br />
                <InputNumber id="tone" v-model="tone" size="4" mode="decimal" v-tooltip="'tone'" :readonly="true">
                </InputNumber>
            </div>
            <div class="col" v-if="['ArduinoTPS', 'RPI2040'].includes(this.selectedHardware)">
                <label for="led">LED</label><br />
                <ToggleButton id="led" name="led" v-model="led" onLabel="" offLabel="" onIcon="pi pi-circle"
                    offIcon="pi pi-circle" />
            </div>
        </div>
    </Panel>
    <Popupout :showDialog="showDialog" :dout1="dout1" :dout2="dout2" :dout3="dout3" :dout4="dout4"/>
</template>

<script>
import { resolveDirective, withDirectives } from "vue";
import Popupout from "./popupout.vue";

export default {
    props: {
        dout1: Boolean,
        dout2: Boolean,
        dout3: Boolean,
        dout4: Boolean,
        pwm1: Number,
        pwm2: Number,
        pwm3: Number,
        pwm4: Number,
        srv1: Number,
        srv2: Number,
        srv3: Number,
        srv4: Number,
        tone: Number,
        led: Boolean,
        selectedHardware: String,
    },
    data() {
        return {
            showDialog: false,
        };
    },
    computed: {
        dout: {
            get() {
                let d = (this.dout1 | 0) + ((this.dout2 | 0) << 1) + ((this.dout3 | 0) << 2) + ((this.dout4 | 0) << 3);
                return "0x" + d.toString(16);
            }
        },
    },
    components: { Popupout }
}

</script>
<style scoped>
.dout {
    background-color: white !important;
}
</style>