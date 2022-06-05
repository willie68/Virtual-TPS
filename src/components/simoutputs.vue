<template>
    <Panel header="Outputs">
        <template #icons>
            <button class="p-panel-header-icon p-link mr-2" @click="showDialog=!showDialog">
                <span class="pi pi-arrow-up-left"></span>
            </button>
        </template>
        <div class="grid">
            <div class="col">
                <label for="Dout4">Dout 4</label><br />
                <ToggleButton id="Dout4" name="Dout4" v-model="dout4" readonly="true" disabled="disabled" onLabel=""
                    offLabel="" onIcon="pi pi-check" offIcon="pi pi-times" />
            </div>
            <div class="col">
                <label for="Dout3">Dout 3</label><br />
                <ToggleButton id="Dout3" name="Dout3" v-model="dout3" readonly="true" disabled="disabled" onLabel=""
                    offLabel="" onIcon="pi pi-check" offIcon="pi pi-times" />
            </div>
            <div class="col">
                <label for="Dout2">Dout 2</label><br />
                <ToggleButton id="Dout2" name="Dout2" v-model="dout2" readonly="true" disabled="disabled" onLabel=""
                    offLabel="" onIcon="pi pi-check" offIcon="pi pi-times" />
            </div>
            <div class="col">
                <label for="Dout1">Dout 1</label><br />
                <ToggleButton id="Dout1" name="Dout1" v-model="dout1" readonly="true" disabled="disabled" onLabel=""
                    offLabel="" onIcon="pi pi-check" offIcon="pi pi-times" />
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
            <div v-if="['ArduinoTPS', 'Microbit', 'ESP32'].includes(this.selectedHardware)" class="col">
                <label for="PWM2">PWM 2</label><br />
                <Knob id="PWM2" name="PWM2" v-model="pwm2" :min="0" :max="100" readonly=true valueTemplate="{value}%"
                    :size="70" />
            </div>
            <div v-if="['ArduinoTPS', 'Microbit', 'ESP32'].includes(this.selectedHardware)" class="col">
                <label for="SRV1">Servo 1</label><br />
                <Knob id="SRV1" name="SRV1" v-model="srv1" :min="0" :max="180" readonly=true valueTemplate="{value}°"
                    :size="70" />
            </div>
            <div v-if="['ArduinoTPS', 'Microbit', 'ESP32'].includes(this.selectedHardware)" class="col">
                <label for="SRV2">Servo 2</label><br />
                <Knob id="SRV2" name="SRV2" v-model="srv2" :min="0" :max="180" readonly=true valueTemplate="{value}°"
                    :size="70" />
            </div>
        </div>
        <div v-if="['ArduinoTPS', 'Microbit', 'ESP32'].includes(this.selectedHardware)" class="grid">
            <div class="col">
                <label for="tone">Tone</label><br />
                <InputNumber id="tone" v-model="tone" size="4" mode="decimal" v-tooltip="'tone'" :readonly="true">
                </InputNumber>
            </div>
        </div>
    </Panel>
    <Dialog position="topleft" v-model:visible="showDialog" :closable="false">
                <div class="grid">
            <div class="col">
                <ToggleButton :class="{dout: dout4}" id="Dout4" name="Dout4" v-model="dout4" onIcon="pi pi-circle" offIcon="pi pi-circle" />
                <br />
                <label for="Dout4">Dout 4</label>
            </div>
            <div class="col">
                <ToggleButton :class="{dout: dout3}" id="Dout3" name="Dout3" v-model="dout3" onIcon="pi pi-circle" offIcon="pi pi-circle" />
                <br />
                <label for="Dout3">Dout 3</label>
            </div>
            <div class="col">
                <ToggleButton :class="{dout: dout2}" id="Dout2" name="Dout2" v-model="dout2" onIcon="pi pi-circle" offIcon="pi pi-circle" />
                <br />
                <label for="Dout2">Dout 2</label>
            </div>
            <div class="col">
                <ToggleButton :class="{dout: dout1}" id="Dout1" name="Dout1" v-model="dout1"  onIcon="pi pi-circle" offIcon="pi pi-circle" />
                <br />
                <label for="Dout1">Dout 1</label>
            </div>
        </div>
    </Dialog>
</template>

<script>
import { resolveDirective, withDirectives } from "vue";

export default {
    props: {
        dout1: Boolean,
        dout2: Boolean,
        dout3: Boolean,
        dout4: Boolean,
        pwm1: Number,
        pwm2: Number,
        srv1: Number,
        srv2: Number,
        tone: Number,
        selectedHardware: String,
    },
    data() {
        return {
            showDialog: false,
        }
    },
    computed: {
        dout: {
            get() {
                let d = (this.dout1 | 0) + ((this.dout2 | 0) << 1) + ((this.dout3 | 0) << 2) + ((this.dout4 | 0) << 3);
                return '0x' + d.toString(16)
            }
        },

    }
}

</script>
<style scoped>

.dout {
    background-color: white !important;
}
</style>