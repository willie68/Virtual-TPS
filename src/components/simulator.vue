<template>
<Toolbar>
    <template #start>
        <div class="toolbar-label">TPS Simulator</div>
    </template>
    <template #end>
        <Button class="p-button-rounded" icon="pi pi-play" v-tooltip.bottom="'start'"></Button>
        <Button class="p-button-rounded" icon="pi pi-step-forward-alt" v-tooltip.bottom="'next step'"></Button>
        <Button class="p-button-rounded" icon="pi pi-stop" v-tooltip.bottom="'stop'"></Button>
        <Button class="p-button-rounded" icon="pi pi-undo" v-tooltip.bottom="'restart'"></Button>
    </template>
</Toolbar>
    <div class="grid">
        <div class="col">
            <Panel header="Inputs">  
                <div class="grid">
                    <div class="col">
                        <label for="Din1">Din 1</label><br/>
                        <InputSwitch id="Din1" name="Din 1" v-model="din1" :change="oninchange()"/>
                    </div>
                    <div class="col">
                        <label for="Din2">Din 2</label><br/>
                        <InputSwitch id="Din2" name="Din 2" v-model="din2" :change="oninchange()"/>
                    </div>
                    <div class="col">
                        <label for="Din3">Din 3</label><br/>
                        <InputSwitch id="Din3" name="Din 3" v-model="din3" :change="oninchange()"/>
                    </div>
                    <div class="col">
                        <label for="Din4">Din 4</label><br/>
                        <InputSwitch id="Din4" name="Din 4" v-model="din4" :change="oninchange()"/>
                    </div>
                </div>
                <div class="grid">
                    <div class="col">
                        <label for="ADC1">ADC 1</label><br/>
                        <Knob id="ADC1" name="ADC1" v-model="adc1" :min="0" :max="100" valueTemplate="{value}%"  :change="onadcchange()" :size="70" />
                    </div>
                    <div class="col">
                        <label for="ADC2">AD 2</label><br/>
                        <Knob id="ADC2" name="ADC2" v-model="adc2" :min="0" :max="100" valueTemplate="{value}%" :change="onadcchange()" :size="70"/>
                    </div>
                    <div class="col">
                        <label for="RC1">RC 1</label><br/>
                        <Knob id="RC1" name="RC1" v-model="rc1" :min="0" :max="180" valueTemplate="{value}°"  :change="onrcchange()" :size="70"/>
                    </div>
                    <div class="col">
                        <label for="RC2">RC 2</label><br/>
                        <Knob id="RC2" name="RC2" v-model="rc2" :min="0" :max="180" valueTemplate="{value}°" :change="onrcchange()" :size="70"/>
                    </div>
                </div>
                <div class="grid">
                    <div class="col">
                        <label for="SEL">SEL</label><br/>
                        <ToggleButton id="SEL" name="SEL" v-model="sel" onLabel="" offLabel="" onIcon="pi pi-check" offIcon="pi pi-times"/>
                    </div>
                    <div class="col">
                        <label for="PRG">PRG</label><br/>
                        <ToggleButton id="PRG" name="PRG" v-model="prg" onLabel="" offLabel="" onIcon="pi pi-check" offIcon="pi pi-times"/>
                    </div>
                </div>
            </Panel>
            <Panel header="Outputs">  
                <div class="grid">
                    <div class="col">
                        <label for="Dout1">Dout 1</label><br/>
                        <ToggleButton id="Dout1" name="Dout1" v-model="dout1" readonly="true" disabled="disabled" onLabel="" offLabel="" onIcon="pi pi-check" offIcon="pi pi-times"/>
                    </div>
                    <div class="col">
                        <label for="Dout2">Dout 2</label><br/>
                        <ToggleButton id="Dout2" name="Dout2" v-model="dout2" readonly="true" disabled="disabled" onLabel="" offLabel="" onIcon="pi pi-check" offIcon="pi pi-times"/>
                    </div>
                    <div class="col">
                        <label for="Dout3">Dout 3</label><br/>
                        <ToggleButton id="Dout3" name="Dout3" v-model="dout3" readonly="true" disabled="disabled" onLabel="" offLabel="" onIcon="pi pi-check" offIcon="pi pi-times"/>
                    </div>
                    <div class="col">
                        <label for="Dout4">Din 4</label><br/>
                        <ToggleButton id="Dout4" name="Dout4" v-model="dout4" readonly="true" disabled="disabled" onLabel="" offLabel="" onIcon="pi pi-check" offIcon="pi pi-times"/>
                    </div>
                </div>
                <div class="grid">
                    <div class="col">
                        <label for="PWM1">PWM 1</label><br/>
                        <Knob id="PWM1" name="PWM1" v-model="pwm1" :min="0" :max="100" readonly="true" valueTemplate="{value}%" :size="70"/>
                    </div>
                    <div class="col">
                        <label for="PWM2">PWM 2</label><br/>
                        <Knob id="PWM2" name="PWM2" v-model="pwm2" :min="0" :max="100" readonly="true" valueTemplate="{value}%" :size="70"/>
                    </div>
                    <div class="col">
                        <label for="SRV1">Servo 1</label><br/>
                        <Knob id="SRV1" name="SRV1" v-model="srv1" :min="0" :max="180" readonly="true"  valueTemplate="{value}°" :size="70"/>
                    </div>
                    <div class="col">
                        <label for="SRV2">Servo 2</label><br/>
                        <Knob id="SRV2" name="SRV2" v-model="srv2" :min="0" :max="180" readonly="true"  valueTemplate="{value}°" :size="70"/>
                    </div>
                </div>
            </Panel>
        </div>
        <div class="col">
            <Panel header="Internal">  
                <div class="grid">
                    <div class="col">
                        <label for="rega">A</label><br/>
                        <InputNumber id="rega" v-model="rega" size="4" mode="decimal" v-tooltip="'Register A'" :readonly="true"></InputNumber>
                    </div>
                    <div class="col">
                        <label for="regb">B</label><br/>
                        <InputNumber id="regb" v-model="regb" size="4" mode="decimal" v-tooltip="'Register B'" :readonly="true"></InputNumber>
                    </div>
                    <div class="col">
                        <label for="addr">Addr</label><br/>
                        <InputNumber id="addr" v-model="addr" size="4" mode="decimal" v-tooltip="'Adresse'" :readonly="true"></InputNumber>
                    </div>
                </div>
                <div class="grid">
                    <div class="col">
                        <label for="regc">C</label><br/>
                        <InputNumber id="regc" v-model="regc" size="4" mode="decimal" v-tooltip="'Register C'" :readonly="true"></InputNumber>
                    </div>
                    <div class="col">
                        <label for="regd">D</label><br/>
                        <InputNumber id="regd" v-model="regd" size="4" mode="decimal" v-tooltip="'Register D'" :readonly="true"></InputNumber>
                    </div>
                    <div class="col">
                        <label for="page">Page</label><br/>
                        <InputNumber id="page" v-model="page" size="4" mode="decimal" v-tooltip="'Page'" :readonly="true"></InputNumber>
                    </div>
                </div>
                <div class="grid">
                    <div class="col">
                        <label for="rege">E</label><br/>
                        <InputNumber id="rege" v-model="rege" size="4" mode="decimal" v-tooltip="'Register E'" :readonly="true"></InputNumber>
                    </div>
                    <div class="col">
                        <label for="regf">F</label><br/>
                        <InputNumber id="regf" v-model="regf" size="4" mode="decimal" v-tooltip="'Register F'" :readonly="true"></InputNumber>
                    </div>
                    <div class="col">
                        <label for="raddr">RAddr</label><br/>
                        <InputNumber id="raddr" v-model="raddr" size="4" mode="decimal" v-tooltip="'Rücksprungadresse'" :readonly="true"></InputNumber>
                    </div>
                </div>
                <label for="stack">Stack</label><br/>
                <Listbox id="stack" :options="stack" :readonly="true" emptyMessage="no stack"></Listbox>
            </Panel>
        </div>
    </div>
</template>

<script>
export default {
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
            rega: 0,
            regb: 0,
            regc: 0,
            regd: 0,
            rege: 0,
            regf: 0,
            addr: 0,
            page: 0,
            raddr: 0,
            stack: [ ]
        }
    },
    methods: {
        onadcchange() {
            this.pwm1 = this.adc1;
            this.pwm2 = this.adc2;
        },
        onrcchange() {
            this.srv1 = this.rc1;
            this.srv2 = this.rc2;
        },
        oninchange() {
            this.dout1 = this.din1;
            this.dout2 = this.din2;
            this.dout3 = this.din3;
            this.dout4 = this.din4;
        },
        donothing(event) {
            console.log("event");
            if (event) {
                event.stopPropagation();
            }
        }
    }
}
</script>