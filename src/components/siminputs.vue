<template>
    <Panel header="Inputs">
        <div class="grid">
            <div class="col">
                <label for="Din1">Din 1</label><br />
                <InputSwitch id="Din1" name="Din 1" v-model="din1i" />
            </div>
            <div class="col">
                <label for="Din2">Din 2</label><br />
                <InputSwitch id="Din2" name="Din 2" v-model="din2i" />
            </div>
            <div class="col">
                <label for="Din3">Din 3</label><br />
                <InputSwitch id="Din3" name="Din 3" v-model="din3i" />
            </div>
            <div class="col">
                <label for="Din4">Din 4</label><br />
                <InputSwitch id="Din4" name="Din 4" v-model="din4i" />
            </div>
        </div>
        <div class="grid">
            <div class="col" style="margin: 0 auto;">
                <label for="ADC1">ADC 1</label><br />
                <Knob id="ADC1" name="ADC1" v-model="adc1i" :min="0" :max="100" valueTemplate="{value}%" :size="70" />
            </div>
            <div class="col">
                <label for="ADC2">AD 2</label><br />
                <Knob id="ADC2" name="ADC2" v-model="adc2i" :min="0" :max="100" valueTemplate="{value}%" :size="70" />
            </div>
            <div class="col">
                <label for="RC1">RC 1</label><br />
                <Knob id="RC1" name="RC1" v-model="rc1i" :min="0" :max="180" valueTemplate="{value}°" :size="70" />
            </div>
            <div class="col">
                <label for="RC2">RC 2</label><br />
                <Knob id="RC2" name="RC2" v-model="rc2i" :min="0" :max="180" valueTemplate="{value}°" :size="70" />
            </div>
        </div>
        <div class="grid">
            <div class="col">
                <label for="SEL">SEL</label><br />
                <ToggleButton id="SEL" name="SEL" v-model="seli" onLabel="" offLabel="" onIcon="pi pi-check"
                    offIcon="pi pi-times" />
            </div>
            <div class="col">
                <label for="PRG">PRG</label><br />
                <ToggleButton id="PRG" name="PRG" v-model="prgi" onLabel="" offLabel="" onIcon="pi pi-check"
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
        sel: Boolean
    },
    emits: ['update:din1', 'update:din2', 'update:din3', 'update:din4', 'update:adc1', 'update:adc2', 'update:rc1', 'update:rc2', 'update:prg', 'update:sel'],
    computed: {
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
